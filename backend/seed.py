# backend/seed.py
from datetime import datetime, timezone
from werkzeug.security import generate_password_hash
from app import create_app
from models import db, User, Team, TeamMember, Track, Submission, Dataset


def seed_database():
    app = create_app()
    with app.app_context():
        # Drop and recreate tables
        db.drop_all()
        db.create_all()

        # --- Create Individual Users with Expertise ---
        users = [
            {
                'name': 'Alice Smith',
                'email': 'alice@example.com',
                'password': 'alicepass',
                'expertise': 'Data Visualization'
            },
            {
                'name': 'Bob Johnson',
                'email': 'bob@example.com',
                'password': 'bobpass',
                'expertise': 'Machine Learning'
            },
            {
                'name': 'Carol Lee',
                'email': 'carol@example.com',
                'password': 'carolpass',
                'expertise': 'Statistics'
            }
        ]
        for u in users:
            user = User(
                name=u['name'],
                email=u['email'],
                password_hash=generate_password_hash(u['password']),
                expertise=u['expertise'],
                created_at=datetime.now(timezone.utc)
            )
            db.session.add(user)
        db.session.commit()

        # --- Create Teams with Members ---
        team_data = [
            {
                'team_name': 'Team Alpha',
                'description': 'Alpha team for ML track',
                'members': [
                    {'name': 'Dev A', 'email': 'deva@example.com', 'password': 'devapass', 'expertise': 'Deep Learning'},
                    {'name': 'Dev B', 'email': 'devb@example.com', 'password': 'devbpass', 'expertise': 'Data Engineering'}
                ]
            },
            {
                'team_name': 'Team Beta',
                'description': 'Beta group for Viz track',
                'members': [
                    {'name': 'Dev C', 'email': 'devc@example.com', 'password': 'devcpass', 'expertise': 'UI/UX'},
                    {'name': 'Dev D', 'email': 'devd@example.com', 'password': 'devdpass', 'expertise': 'Front-end'}
                ]
            }
        ]
        for t in team_data:
            team = Team(
                name=t['team_name'],
                description=t['description'],
                created_at=datetime.now(timezone.utc)
            )
            db.session.add(team)
            db.session.flush()  # to get team.id

            for m in t['members']:
                user = User(
                    name=m['name'],
                    email=m['email'],
                    password_hash=generate_password_hash(m['password']),
                    expertise=m['expertise'],
                    created_at=datetime.now(timezone.utc)
                )
                db.session.add(user)
                db.session.flush()
                tm = TeamMember(team_id=team.id, user_id=user.id, role='member')
                db.session.add(tm)
        db.session.commit()

        # --- Create Tracks and Datasets ---
        track1 = Track(
            name='Data Science Challenge',
            description='Solve complex data problems',
            rules='Use machine learning techniques'
        )
        track2 = Track(
            name='Visualization Contest',
            description='Create compelling visualizations',
            rules='Interactive and informative'
        )
        db.session.add_all([track1, track2])
        db.session.commit()

        # Sample Datasets
        ds1 = Dataset(
            track_id=track1.id,
            dataset_name='Customer Transactions',
            description='Transaction records for retail analysis',
            file_url='http://example.com/transactions.csv'
        )
        ds2 = Dataset(
            track_id=track2.id,
            dataset_name='Global Sales',
            description='Sales data across regions',
            file_url='http://example.com/sales.csv'
        )
        db.session.add_all([ds1, ds2])
        db.session.commit()

        # --- Create Sample Submissions ---
        # Individual submission by Alice
        alice = User.query.filter_by(email='alice@example.com').first()
        submission1 = Submission(
            user_id=alice.id,
            track_id=track1.id,
            model_file_url='/uploads/model_alice.pkl',
            supporting_docs_url='/uploads/docs_alice.pdf',
            status='Pending',
            submission_date=datetime.now(timezone.utc)
        )
        # Team submission by Team Alpha (use first member to own submission)
        team_alpha_member = TeamMember.query.filter_by(team_id=1).first()
        submission2 = Submission(
            user_id=team_alpha_member.user_id,
            track_id=track1.id,
            model_file_url='/uploads/model_alpha.pkl',
            supporting_docs_url='/uploads/docs_alpha.pdf',
            status='Submitted',
            submission_date=datetime.now(timezone.utc)
        )
        db.session.add_all([submission1, submission2])
        db.session.commit()

        print('Database seeded successfully!')


if __name__ == '__main__':
    seed_database()
