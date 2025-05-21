# backend/app.py
from flask import Flask, jsonify
from flask_cors import CORS
from config import Config  # Assuming config.py is in the same directory or accessible
from models import db      # Assuming models.py is in the same directory or accessible
from flask_jwt_extended import JWTManager
from routes.auth import auth_bp
from routes.tracks import tracks_bp
from routes.submissions import submissions_bp
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
import os # Ensure os is imported if you use os.environ directly here

def create_app():
    app = Flask(__name__) # Create the app instance inside the factory
    
    # Configure CORS
    # IMPORTANT: Replace 'https://YOUR_ACTUAL_FRONTEND_CLOUD_RUN_URL' 
    # with the actual URL of your deployed frontend service from Cloud Run.
    frontend_custom_domain = os.environ.get("FRONTEND_URL")
    local_dev_url1 = "http://localhost:3000" 
    local_dev_url2 = "http://localhost:3001" 

    CORS(
        app,
        resources={r"/api/*": {"origins": [frontend_custom_domain, local_dev_url1, local_dev_url2]}},
        methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allow_headers=["Content-Type", "Authorization"],
        supports_credentials=True
    )
    print(f"DEBUG: CORS configured for origins: {[frontend_custom_domain, local_dev_url1, local_dev_url2]}")
    
    app.config.from_object(Config)
    print(f"DEBUG: App config loaded. SQLALCHEMY_DATABASE_URI from app.config: {app.config.get('SQLALCHEMY_DATABASE_URI')}")

    # Initialize Flask-Limiter
    limiter = Limiter(
        key_func=get_remote_address,
        app=app,
        default_limits=["200 per day", "50 per hour"], # General limits for all routes
        storage_uri="memory://", # Good starting point for Cloud Run
    )
    print("DEBUG: Flask-Limiter initialized")

    # Initialize other extensions
    db.init_app(app)
    print("DEBUG: db.init_app(app) called")

    JWTManager(app)
    print("DEBUG: JWTManager configured")

    # Apply rate limits to specific blueprints BEFORE registering them
    # This modifies the auth_bp object to include the rate limits.
    limiter.limit("15 per minute;60 per hour")(auth_bp) 
    print(f"DEBUG: Rate limit applied to auth_bp: 15 per minute;60 per hour")

    # Register blueprints ONCE
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(tracks_bp, url_prefix='/api/tracks')
    app.register_blueprint(submissions_bp, url_prefix='/api/submissions')
    print("DEBUG: Blueprints registered")

    @app.route("/")
    def index():
        return "Hello, Datathon! Welcome to the API."
    
    @app.errorhandler(404)
    def not_found(error):
        return jsonify({'error': 'Not found'}), 404

    @app.errorhandler(500)
    def server_error(error):
        # For production, you'd want more robust logging here
        # import logging
        # app.logger.exception('An error occurred during a request.') # Use app.logger
        print(f"DEBUG: Server error encountered: {error}") 
        return jsonify({'error': 'Internal server error'}), 500

    with app.app_context():
        print("DEBUG: Entered app_context for db.create_all()")
        try:
            db.create_all() 
            print("DEBUG: db.create_all() completed successfully (or tables already exist).")
        except Exception as e:
            print(f"DEBUG: ERROR during db.create_all(): {e}")
            # Optionally re-raise the exception if you want the app to fail hard here
            # raise e

    print("DEBUG: Exiting create_app()")
    return app

app = create_app()

if __name__ == '__main__':
    # This part is for local development, not used by Gunicorn in Cloud Run
    app.run(debug=True, port=5001)
