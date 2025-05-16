# backend/routes/auth.py
from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, create_refresh_token
from models import db, User, Team, TeamMember

auth_bp = Blueprint('auth', __name__)

# Individual registration endpoint (remains unchanged)
@auth_bp.route('/register/individual', methods=['POST'])
def register_individual():
    data = request.get_json() or {}
    email = data.get('email')
    password = data.get('password')
    name = data.get('name', '')
    expertise = data.get('expertise')

    if not email or not password or not expertise: # Assuming expertise is mandatory for individuals too
        return jsonify({'success': False, 'error': 'Missing name, email, password, or expertise'}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({'success': False, 'error': 'User already exists'}), 400

    user = User(
        name=name,
        email=email,
        password_hash=generate_password_hash(password),
        expertise=expertise
    )
    db.session.add(user)
    db.session.commit()
    return jsonify({'success': True, 'message': 'Individual registered successfully', 'user': {
        'id': user.id,
        'name': user.name,
        'email': user.email,
        'expertise': user.expertise
    }}), 201

# --- MODIFIED Team Registration Endpoint ---
@auth_bp.route('/register/team', methods=['POST'])
def register_team():
    data = request.get_json() or {}
    team_name = data.get('team_name')
    team_password = data.get('team_password') # <-- NEW: Get team password
    description = data.get('description', '')
    members_data = data.get('members', []) # Renamed for clarity

    # --- NEW: Validations ---
    if not team_name or not team_password:
        return jsonify({'success': False, 'error': 'Missing team name or team password'}), 400

    if not members_data or not isinstance(members_data, list):
        return jsonify({'success': False, 'error': 'Members list is required and must be a list'}), 400
        
    num_members = len(members_data)
    if not (1 <= num_members <= 4):
        return jsonify({'success': False, 'error': 'Team must have between 1 and 4 members'}), 400
    # --- End NEW Validations ---

    # Hash the team password once
    hashed_team_password = generate_password_hash(team_password)

    # Create team
    team = Team(name=team_name, description=description)
    db.session.add(team)
    # It's often better to flush later or let commit handle it unless you need the ID immediately
    # and are sure the team creation itself won't fail basic DB constraints.
    # For now, let's try committing everything at the end or flushing within the loop carefully.

    created_users_for_team = [] # To keep track of users created in this transaction

    # Create users for each member and link to team
    for member_info in members_data:
        mem_email = member_info.get('email')
        mem_name = member_info.get('name') # Assuming 'name' is now the key, not 'mem_name'
        mem_exp = member_info.get('expertise')

        # --- MODIFIED: Validation for member details ---
        # Password for member is no longer expected in member_info, expertise is now key
        if not mem_email or not mem_name or not mem_exp:
            db.session.rollback() # Rollback if any member has incomplete info
            return jsonify({'success': False, 'error': 'Each member requires name, email, and expertise'}), 400

        if User.query.filter_by(email=mem_email).first():
            db.session.rollback() # Rollback if any user already exists
            return jsonify({'success': False, 'error': f'User with email {mem_email} already exists'}), 400

        user = User(
            name=mem_name,
            email=mem_email,
            password_hash=hashed_team_password, # <-- MODIFIED: Use hashed team_password
            expertise=mem_exp
        )
        db.session.add(user)
        created_users_for_team.append(user) # Add to list

    # Now that all users are potentially valid, flush to get their IDs
    # or prepare for linking. If we db.session.add() all users and then the team,
    # then add TeamMembers, a single commit at the end should work.

    try:
        db.session.flush() # Assign IDs to team and newly created users before creating TeamMember links

        for user_instance in created_users_for_team:
            tm = TeamMember(team_id=team.id, user_id=user_instance.id)
            db.session.add(tm)
        
        db.session.commit() # Commit all changes (team, users, team_members)
    except Exception as e:
        db.session.rollback()
        # Log the exception e for server-side debugging
        return jsonify({'success': False, 'error': f'An error occurred during team registration: {str(e)}'}), 500


    return jsonify({'success': True, 'message': 'Team registered successfully', 'team_id': team.id}), 201

# Updated login endpoint (remains unchanged, users will login with their individual email
# and the (now potentially shared) team password if they were registered via the team route)
@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json() or {}
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'success': False, 'error': 'Missing email or password'}), 400

    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password_hash, password):
        return jsonify({'success': False, 'error': 'Invalid credentials'}), 401

    access_token = create_access_token(identity=user.id)
    refresh_token = create_refresh_token(identity=user.id)

    return jsonify({
        'success': True,
        'access_token': access_token,
        'refresh_token': refresh_token,
        'user': {
            'id': user.id,
            'name': user.name,
            'expertise': user.expertise # Or any other user details you want to return
        }
    }), 200