# backend/routes/auth.py
from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, create_refresh_token
from marshmallow import Schema, fields, validate, ValidationError, validates
from models import db, User, Team, TeamMember


import re

# This helper function will be used by the custom Marshmallow validators
def get_password_strength_violations(password):
    """
    Checks password against complexity rules.
    Returns a list of violation messages, or an empty list if password is strong.
    """
    violations = []
    if not password: # Handle empty password case early
        violations.append("Password cannot be empty.")
        return violations

    if len(password) < 10:
        violations.append("Password must be at least 10 characters long.")
    if not re.search(r"[A-Z]", password):
        violations.append("Password must contain an uppercase letter.")
    if not re.search(r"[a-z]", password):
        violations.append("Password must contain a lowercase letter.")
    if not re.search(r"[0-9]", password):
        violations.append("Password must contain a number.")
    if not re.search(r"[!@#$%^&*()_+\-=\[\]{};':\"\\|,.<>\/?]", password): # Note: regex special chars like \ are escaped
        violations.append("Password must contain a special character.")
    return violations

# --- Marshmallow Schemas ---

class MemberSchema(Schema):
    """Schema for individual members within a team registration."""
    name = fields.Str(required=True, validate=validate.Length(min=1, max=128))
    email = fields.Email(required=True)
    expertise = fields.Str(required=True, validate=validate.Length(min=1, max=128))

class IndividualRegistrationSchema(Schema):
    """Schema for individual user registration."""
    name = fields.Str(required=True, validate=validate.Length(min=1, max=128))
    email = fields.Email(required=True)
    password = fields.Str(required=True)
    expertise = fields.Str(required=True, validate=validate.Length(min=1, max=128))

    @validates('password')
    def validate_password_strength(self, value, **kwargs): # MODIFIED: Added **kwargs
        """Validates the strength of the password field."""
        if not value: 
            raise ValidationError("Password cannot be empty.")
        violations = get_password_strength_violations(value)
        if violations:
            raise ValidationError(violations)


class TeamRegistrationSchema(Schema):
    """Schema for team registration."""
    team_name = fields.Str(required=True, validate=validate.Length(min=1, max=128))
    team_password = fields.Str(required=True)
    description = fields.Str(validate=validate.Length(max=500), load_default="") 
    members = fields.List(
        fields.Nested(MemberSchema),
        required=True,
        validate=validate.Length(min=1, max=4)
    )

    @validates('team_password')
    def validate_team_password_strength(self, value, **kwargs): # MODIFIED: Added **kwargs
        """Validates the strength of the team_password field."""
        if not value: 
            raise ValidationError("Team password cannot be empty.")
        violations = get_password_strength_violations(value)
        if violations:
            raise ValidationError(violations)


class LoginSchema(Schema):
    """Schema for user login."""
    email = fields.Email(required=True)
    password = fields.Str(required=True)

# --- Initialize Schemas ---
individual_reg_schema = IndividualRegistrationSchema()
team_reg_schema = TeamRegistrationSchema()
login_schema = LoginSchema()

# --- Blueprint Definition ---
auth_bp = Blueprint('auth', __name__)

# --- Routes ---

@auth_bp.route('/register/individual', methods=['POST'])
def register_individual():
    json_data = request.get_json()
    if not json_data:
        return jsonify({'success': False, 'error': 'No input data provided'}), 400
    
    try:
        data = individual_reg_schema.load(json_data)
    except ValidationError as err:
        return jsonify({'success': False, 'errors': err.messages}), 400

    email = data.get('email')
    password = data.get('password') 
    name = data.get('name')
    expertise = data.get('expertise')

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


@auth_bp.route('/register/team', methods=['POST'])
def register_team():
    json_data = request.get_json()
    if not json_data:
        return jsonify({'success': False, 'error': 'No input data provided'}), 400

    try:
        data = team_reg_schema.load(json_data)
    except ValidationError as err:
        return jsonify({'success': False, 'errors': err.messages}), 400

    team_name = data.get('team_name')
    team_password = data.get('team_password') 
    description = data.get('description') 
    members_data = data.get('members')

    hashed_team_password = generate_password_hash(team_password)
    team = Team(name=team_name, description=description)
    db.session.add(team)

    created_users_for_team = []
    for member_info in members_data:
        mem_email = member_info.get('email')
        mem_name = member_info.get('name')
        mem_exp = member_info.get('expertise')

        if User.query.filter_by(email=mem_email).first():
            db.session.rollback()
            return jsonify({'success': False, 'error': f'User with email {mem_email} already exists'}), 400

        user = User(
            name=mem_name,
            email=mem_email,
            password_hash=hashed_team_password,
            expertise=mem_exp
        )
        db.session.add(user)
        created_users_for_team.append(user)

    try:
        db.session.flush()
        for user_instance in created_users_for_team:
            tm = TeamMember(team_id=team.id, user_id=user_instance.id)
            db.session.add(tm)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'error': f'An error occurred during team registration: {str(e)}'}), 500

    return jsonify({'success': True, 'message': 'Team registered successfully', 'team_id': team.id}), 201


@auth_bp.route('/login', methods=['POST'])
def login():
    json_data = request.get_json()
    if not json_data:
        return jsonify({'success': False, 'error': 'No input data provided'}), 400

    try:
        data = login_schema.load(json_data)
    except ValidationError as err:
        return jsonify({'success': False, 'errors': err.messages}), 400

    email = data.get('email')
    password = data.get('password')

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
            'expertise': user.expertise
        }
    }), 200
