from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), nullable=False)
    email = db.Column(db.String(128), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    submissions = db.relationship('Submission', back_populates='user')


class Track(db.Model):
    __tablename__ = 'tracks'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), nullable=False)
    description = db.Column(db.Text)
    rules = db.Column(db.Text)
    datasets = db.relationship('Dataset', back_populates='track', cascade='all, delete-orphan')
    submissions = db.relationship('Submission', back_populates='track')


class Dataset(db.Model):
    __tablename__ = 'datasets'
    id = db.Column(db.Integer, primary_key=True)
    track_id = db.Column(db.Integer, db.ForeignKey('tracks.id'), nullable=False)  # Note 'tracks.id'
    dataset_name = db.Column(db.String(128), nullable=False)
    description = db.Column(db.Text)
    file_url = db.Column(db.String(256))
    track = db.relationship('Track', back_populates='datasets')

class Submission(db.Model):
    __tablename__ = 'submissions'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))  # Match users table
    track_id = db.Column(db.Integer, db.ForeignKey('tracks.id'))  # Match tracks table
    submission_date = db.Column(db.DateTime, default=db.func.current_timestamp())
    model_file_url = db.Column(db.String(256))
    supporting_docs_url = db.Column(db.String(256))
    status = db.Column(db.String(64), default="Pending")
    user = db.relationship('User', back_populates='submissions')
    track = db.relationship('Track', back_populates='submissions')
