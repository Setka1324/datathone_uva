# backend/seed.py
from app import create_app
from models import db, Track, Dataset

app = create_app()

with app.app_context():
    # Optional: Drop all existing tables (use with caution!)
    db.drop_all()
    db.create_all()

    # Create sample tracks
    track1 = Track(
        name="Track 1: Data Science Challenge",
        description="Solve a complex data problem using various machine learning techniques.",
        rules="Rule set for Track 1: Follow ethical data practices and submit your model code."
    )
    track2 = Track(
        name="Track 2: Machine Learning Marathon",
        description="Build robust machine learning models on a large-scale dataset.",
        rules="Rule set for Track 2: Ensure reproducibility and clarity in your submission."
    )
    track3 = Track(
        name="Track 3: Visualization Contest",
        description="Create compelling visualizations to tell a story with data.",
        rules="Rule set for Track 3: Visualizations must be interactive and informative."
    )

    db.session.add_all([track1, track2, track3])
    db.session.commit()

    # Create sample datasets for Track 1 (as an example)
    dataset1 = Dataset(
        track_id=track1.id,
        dataset_name="Dataset A",
        description="A dataset containing customer transaction data.",
        file_url="http://example.com/dataset_a.csv"
    )
    dataset2 = Dataset(
        track_id=track1.id,
        dataset_name="Dataset B",
        description="A dataset containing social media sentiment scores.",
        file_url="http://example.com/dataset_b.csv"
    )

    db.session.add_all([dataset1, dataset2])
    db.session.commit()

    print("Database seeded successfully!")
