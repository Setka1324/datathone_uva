# backend/config.py
import os
from dotenv import load_dotenv

load_dotenv()
BASE_DIR = os.path.abspath(os.path.dirname(__file__))

class Config:
    SECRET_KEY = os.environ.get("SECRET_KEY") # Will be populated by Secret Manager via Cloud Run

    # Construct SQLALCHEMY_DATABASE_URI from individual components
    DB_USER = os.environ.get("DB_USER", "postgres")
    DB_PASSWORD = os.environ.get("DB_PASSWORD") # Will be populated by Secret Manager
    DB_NAME = os.environ.get("DB_NAME", "datathon_db")
    DB_SOCKET_PATH = os.environ.get("DB_SOCKET_PATH") # e.g., /cloudsql/project:region:instance

    if DB_SOCKET_PATH and DB_PASSWORD: # Production on Cloud Run with Unix Socket
        SQLALCHEMY_DATABASE_URI = f"postgresql+psycopg2://{DB_USER}:{DB_PASSWORD}@/{DB_NAME}?host={DB_SOCKET_PATH}"
    else: # Fallback for local development (ensure .env provides these or similar)
        LOCAL_DB_HOST = os.environ.get("LOCAL_DB_HOST", "localhost")
        LOCAL_DB_PORT = os.environ.get("LOCAL_DB_PORT", "5432") # Default for local Docker
        SQLALCHEMY_DATABASE_URI = f"postgresql+psycopg2://{DB_USER}:{DB_PASSWORD}@{LOCAL_DB_HOST}:{LOCAL_DB_PORT}/{DB_NAME}"

    if SQLALCHEMY_DATABASE_URI is None and os.environ.get("FLASK_ENV") == "production":
        raise ValueError("No SQLALCHEMY_DATABASE_URI could be constructed for production")

    SQLALCHEMY_TRACK_MODIFICATIONS = False
    UPLOAD_FOLDER = os.environ.get("UPLOAD_FOLDER", os.path.join(BASE_DIR, "uploads"))
