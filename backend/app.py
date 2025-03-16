# backend/app.py
from flask import Flask
from config import Config
from models import db
from flask_jwt_extended import JWTManager

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialize extensions
    db.init_app(app)
    JWTManager(app)

    # Register blueprints
    from routes.auth import auth_bp
    app.register_blueprint(auth_bp, url_prefix='/api/auth')

    from routes.tracks import tracks_bp
    app.register_blueprint(tracks_bp, url_prefix='/api/tracks')
    
    from routes.submissions import submissions_bp
    app.register_blueprint(submissions_bp, url_prefix='/api/submissions')

    @app.route("/")
    def index():
        return "Hello, Datathon! Welcome to the API."
    
    # In app.py, add before running the app:
    @app.errorhandler(404)
    def not_found(error):
        return jsonify({'error': 'Not found'}), 404

    @app.errorhandler(500)
    def server_error(error):
        return jsonify({'error': 'Internal server error'}), 500


    # Create database tables (for development)
    with app.app_context():
        db.create_all()

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
