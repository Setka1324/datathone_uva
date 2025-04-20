from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from models import db, User, Team, TeamMember

auth_bp = Blueprint('auth', __name__)

# Individual registration endpoint
@auth_bp.route('/register/individual', methods=['POST'])
def register_individual():
    data = request.get_json() or {}
    email = data.get('email')
    password = data.get('password')
    name = data.get('name', '')
    expertise = data.get('expertise')

    if not email or not password or not expertise:
        return jsonify({'message': 'Missing name, email, password, or expertise'}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({'message': 'User already exists'}), 400

    user = User(
        name=name,
        email=email,
        password_hash=generate_password_hash(password),
        expertise=expertise
    )
    db.session.add(user)
    db.session.commit()
    return jsonify({'message': 'Individual registered successfully'}), 201

# Team registration endpoint
@auth_bp.route('/register/team', methods=['POST'])
def register_team():
    data = request.get_json() or {}
    team_name = data.get('team_name')
    description = data.get('description', '')
    members = data.get('members', [])

    if not team_name or not members:
        return jsonify({'message': 'Missing team name or members list'}), 400

    # Create team
    team = Team(name=team_name, description=description)
    db.session.add(team)
    db.session.flush()  # to get team.id

    # Create users for each member and link to team
    for m in members:
        mem_email = m.get('email')
        mem_pass = m.get('password')
        mem_name = m.get('name', '')
        mem_exp = m.get('expertise')

        if not mem_email or not mem_pass or not mem_exp:
            db.session.rollback()
            return jsonify({'message': 'Each member needs email, password, and expertise'}), 400

        if User.query.filter_by(email=mem_email).first():
            db.session.rollback()
            return jsonify({'message': f'User {mem_email} already exists'}), 400

        user = User(
            name=mem_name,
            email=mem_email,
            password_hash=generate_password_hash(mem_pass),
            expertise=mem_exp
        )
        db.session.add(user)
        db.session.flush()

        tm = TeamMember(team_id=team.id, user_id=user.id)
        db.session.add(tm)

    db.session.commit()
    return jsonify({'message': 'Team registered successfully', 'team_id': team.id}), 201
