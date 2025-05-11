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
    CORS(
        app,
        resources={r"/api/*": {"origins": "http://localhost:3000"}},
        methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allow_headers=["Content-Type", "Authorization"],
        supports_credentials=True
    )
    app.config.from_object(Config)

    # Initialize extensions
    db.init_app(app)
    JWTManager(app) # Initialize JWTManager with the app

    # Register blueprints
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(tracks_bp, url_prefix='/api/tracks')
    app.register_blueprint(submissions_bp, url_prefix='/api/submissions')

    @app.route("/")
    def index():
        return "Hello, Datathon! Welcome to the API."
    
    @app.errorhandler(404)
    def not_found(error):
        return jsonify({'error': 'Not found'}), 404

    @app.errorhandler(500)
    def server_error(error):
        # It's good practice to log the actual error for debugging
        # import logging
        # logging.exception('An error occurred during a request.')
        return jsonify({'error': 'Internal server error'}), 500

    # Create database tables (for development)
    # This is fine for development, but for production, you'd typically use migrations (e.g., Flask-Migrate)
    with app.app_context():
        db.create_all()

    return app

# Create the app instance at the module level using the factory
# This is the 'app' instance Gunicorn will use.
app = create_app()

if __name__ == '__main__':
    # When running directly with 'python app.py', this 'app' (the one from create_app) will be used.
    app.run(debug=True, port=5001)