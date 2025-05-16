# backend/app.py
from flask import Flask, jsonify
from flask_cors import CORS
from config import Config  # Assuming config.py is in the same directory or accessible
from models import db      # Assuming models.py is in the same directory or accessible
from flask_jwt_extended import JWTManager
from routes.auth import auth_bp
from routes.tracks import tracks_bp
from routes.submissions import submissions_bp

# Remove or comment out the initial app = Flask(__name__) from here if it exists at the top level

def create_app():
    app = Flask(__name__) # Create the app instance inside the factory
    frontend_url = "https://datathon-frontend-626383641337.europe-west4.run.app" # Replace with your actual frontend URL
    local_dev_url1 = "http://localhost:3000"
    local_dev_url2 = "http://localhost:3001"
    CORS(
        app,
        resources={r"/api/*": {"origins": [frontend_url, local_dev_url1, local_dev_url2]}},
        methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allow_headers=["Content-Type", "Authorization"],
        supports_credentials=True
    )
    print(f"DEBUG: CORS configured for origins: {[frontend_url, local_dev_url1, local_dev_url2]}") # Added for logging
    
    app.config.from_object(Config)
    print(f"DEBUG: App config loaded. SQLALCHEMY_DATABASE_URI from app.config: {app.config.get('SQLALCHEMY_DATABASE_URI')}") # Added for logging

    db.init_app(app)
    print("DEBUG: db.init_app(app) called") # Added for logging

    JWTManager(app)
    print("DEBUG: JWTManager configured") # Added for logging

    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(tracks_bp, url_prefix='/api/tracks')
    app.register_blueprint(submissions_bp, url_prefix='/api/submissions')
    print("DEBUG: Blueprints registered") # Added for logging

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
        # logging.exception('An error occurred during a request.')
        print(f"DEBUG: Server error encountered: {error}") # Added for logging
        return jsonify({'error': 'Internal server error'}), 500

    with app.app_context():
        print("DEBUG: Entered app_context for db.create_all()") # Added for logging
        try:
            db.create_all() # This should now work against the created 'datathon_db'
            print("DEBUG: db.create_all() completed successfully (or tables already exist).") # Added for logging
        except Exception as e:
            print(f"DEBUG: ERROR during db.create_all(): {e}") # Added for logging
            # Optionally re-raise the exception if you want the app to fail hard here
            # raise e

    print("DEBUG: Exiting create_app()") # Added for logging
    return app

app = create_app()

if __name__ == '__main__':
    # This part is for local development, not used by Gunicorn in Cloud Run
    app.run(debug=True, port=5001)