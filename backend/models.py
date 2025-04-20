from flask_sqlalchemy import SQLAlchemy

# Initialize SQLAlchemy
db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), nullable=False)
    email = db.Column(db.String(128), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    # New field for individual expertise
    expertise = db.Column(db.String(128), nullable=True)

    # Relationship to team memberships
    teams = db.relationship('TeamMember', back_populates='user')

class Track(db.Model):
    __tablename__ = 'track'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), nullable=False)
    description = db.Column(db.Text)
    rules = db.Column(db.Text)

class Dataset(db.Model):
    __tablename__ = 'dataset'
    id = db.Column(db.Integer, primary_key=True)
    track_id = db.Column(db.Integer, db.ForeignKey('track.id'), nullable=False)
    dataset_name = db.Column(db.String(128), nullable=False)
    description = db.Column(db.Text)
    file_url = db.Column(db.String(256))

class Submission(db.Model):
    __tablename__ = 'submission'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    track_id = db.Column(db.Integer, db.ForeignKey('track.id'), nullable=False)
    submission_date = db.Column(db.DateTime, default=db.func.current_timestamp())
    model_file_url = db.Column(db.String(256))
    supporting_docs_url = db.Column(db.String(256))
    status = db.Column(db.String(64), default="Pending")

# New Team and TeamMember models
class Team(db.Model):
    __tablename__ = 'team'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), nullable=False)
    description = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())

    # Relationship to members
    members = db.relationship('TeamMember', back_populates='team', cascade='all, delete-orphan')

class TeamMember(db.Model):
    __tablename__ = 'team_member'
    id = db.Column(db.Integer, primary_key=True)
    team_id = db.Column(db.Integer, db.ForeignKey('team.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    role = db.Column(db.String(64), default='member')

    team = db.relationship('Team', back_populates='members')
    user = db.relationship('User', back_populates='teams')