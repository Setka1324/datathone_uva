# backend/routes/submissions.py
import os
from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, Submission

submissions_bp = Blueprint('submissions', __name__)

def save_file(file, folder):
    """
    Save an uploaded file to the given folder and return its path.
    """
    if not os.path.exists(folder):
        os.makedirs(folder)
    file_path = os.path.join(folder, file.filename)
    file.save(file_path)
    return file_path

@submissions_bp.route('/', methods=['POST'])
@jwt_required()
def create_submission():
    """
    Create a new submission.
    Expects a multipart/form-data request with:
      - 'track_id' (form field)
      - 'model_file' (file upload) [required]
      - 'supporting_docs' (file upload) [optional]
    """
    user_id = get_jwt_identity()
    track_id = request.form.get('track_id')
    if not track_id:
        return jsonify({'message': 'Missing track id'}), 400

    # Ensure a model file is uploaded
    if 'model_file' not in request.files:
        return jsonify({'message': 'Missing model file'}), 400

    model_file = request.files['model_file']
    supporting_docs = request.files.get('supporting_docs')  # Optional

    # Save files in the configured upload folder
    upload_folder = current_app.config.get('UPLOAD_FOLDER', 'uploads')
    model_file_path = save_file(model_file, upload_folder)
    supporting_docs_path = None
    if supporting_docs:
        supporting_docs_path = save_file(supporting_docs, upload_folder)

    submission = Submission(
        user_id=user_id,
        track_id=track_id,
        model_file_url=model_file_path,
        supporting_docs_url=supporting_docs_path,
        status='Pending'
    )
    db.session.add(submission)
    db.session.commit()

    return jsonify({'message': 'Submission created successfully'}), 201

@submissions_bp.route('/<int:user_id>', methods=['GET'])
@jwt_required()
def get_user_submissions(user_id):
    """
    Retrieve all submissions for a specific user.
    Only the user themselves (based on their JWT) can access their submissions.
    """
    current_user = get_jwt_identity()
    if int(current_user) != user_id:
        return jsonify({'message': 'Unauthorized'}), 403

    submissions = Submission.query.filter_by(user_id=user_id).all()
    submissions_list = []
    for submission in submissions:
        submissions_list.append({
            'id': submission.id,
            'track_id': submission.track_id,
            'submission_date': submission.submission_date.isoformat() if submission.submission_date else None,
            'model_file_url': submission.model_file_url,
            'supporting_docs_url': submission.supporting_docs_url,
            'status': submission.status
        })
    return jsonify(submissions_list), 200

@submissions_bp.route('/detail/<int:submission_id>', methods=['GET'])
@jwt_required()
def get_submission(submission_id):
    current_user = get_jwt_identity()
    submission = Submission.query.get(submission_id)
    if not submission:
        return jsonify({'message': 'Submission not found'}), 404
    # Ensure the requesting user is the owner (or add admin logic)
    if submission.user_id != int(current_user):
        return jsonify({'message': 'Unauthorized'}), 403
    submission_data = {
        'id': submission.id,
        'track_id': submission.track_id,
        'submission_date': submission.submission_date.isoformat() if submission.submission_date else None,
        'model_file_url': submission.model_file_url,
        'supporting_docs_url': submission.supporting_docs_url,
        'status': submission.status
    }
    return jsonify(submission_data), 200
