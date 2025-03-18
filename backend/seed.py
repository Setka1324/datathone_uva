# backend/seed.py
from datetime import datetime, timezone  # Updated import
from werkzeug.security import generate_password_hash
from app import create_app
from models import db, User, Track, Submission

def seed_database():
    app = create_app()
    with app.app_context():
        db.drop_all()
        db.create_all()

        # Create test user
        user = User(
            name="Test User",
            email="test@example.com",
            password_hash=generate_password_hash("demo123"),
            created_at=datetime.now(timezone.utc)  # Updated method
        )
        db.session.add(user)
        db.session.commit()

        # Create tracks
        track1 = Track(
            name="Data Science Challenge",
            description="Solve complex data problems",
            rules="Use machine learning techniques"
        )
        track2 = Track(
            name="ML Marathon",
            description="Build robust models",
            rules="Ensure reproducibility"
        )
        db.session.add_all([track1, track2])
        db.session.commit()

        # Create submissions
        submission1 = Submission(
            user_id=user.id,
            track_id=track1.id,
            model_file_url="/uploads/model1.pkl",
            status="Pending",
            submission_date=datetime.now(timezone.utc)
        )
        submission2 = Submission(
            user_id=user.id,
            track_id=track2.id,
            model_file_url="/uploads/model2.pkl",
            status="Approved",
            submission_date=datetime.now(timezone.utc)
        )
        db.session.add_all([submission1, submission2])
        db.session.commit()

if __name__ == '__main__':
    seed_database()
    print("Database seeded successfully!")