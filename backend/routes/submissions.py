# backend/routes/submissions.py
import os
from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity
from marshmallow import Schema, fields, ValidationError, validate
from models import db, Submission

# --- Marshmallow Schema ---

class SubmissionCreateSchema(Schema):
    """Schema for validating the non-file parts of a submission creation request."""
    track_id = fields.Int(required=True, strict=True, error_messages={"required": "Track ID is required."})
    # Note: File fields ('model_file', 'supporting_docs') are handled separately
    # as they come from request.files, not a JSON body.

# --- Initialize Schema ---
submission_create_schema = SubmissionCreateSchema()

# --- Blueprint Definition ---
submissions_bp = Blueprint('submissions', __name__)

# --- Helper Function ---
def save_file(file, folder):
    """
    Save an uploaded file to the given folder and return its path.
    """
    if not file or not file.filename: # Basic check
        return None
    if not os.path.exists(folder):
        os.makedirs(folder)
    # Consider sanitizing filename here for security
    # from werkzeug.utils import secure_filename
    # filename = secure_filename(file.filename)
    # file_path = os.path.join(folder, filename)
    file_path = os.path.join(folder, file.filename) # Using original filename for now
    file.save(file_path)
    return file_path

# --- Routes ---

@submissions_bp.route('/', methods=['POST'])
@jwt_required()
def create_submission():
    """
    Create a new submission.
    Expects a multipart/form-data request with:
      - 'track_id' (form field) - validated by Marshmallow
      - 'model_file' (file upload) [required] - checked manually
      - 'supporting_docs' (file upload) [optional] - checked manually
    """
    user_id = get_jwt_identity()

    # Validate form fields using Marshmallow
    # request.form contains the non-file form fields
    form_data = request.form.to_dict() # Convert ImmutableMultiDict to dict for Marshmallow
    try:
        validated_data = submission_create_schema.load(form_data)
    except ValidationError as err:
        return jsonify({'success': False, 'errors': err.messages}), 400
    
    track_id = validated_data.get('track_id')

    # File validation and handling (remains largely the same)
    if 'model_file' not in request.files or not request.files['model_file'].filename:
        return jsonify({'success': False, 'message': 'Missing or empty model file'}), 400

    model_file = request.files['model_file']
    supporting_docs_file = request.files.get('supporting_docs') # Optional

    upload_folder = current_app.config.get('UPLOAD_FOLDER', 'uploads')
    
    # Basic check for file content (example: ensure file is not empty if it exists)
    # You might want more sophisticated checks (file type, size limits)
    
    model_file_path = save_file(model_file, upload_folder)
    if not model_file_path: # save_file might return None if file is problematic
        return jsonify({'success': False, 'message': 'Could not save model file.'}), 400

    supporting_docs_path = None
    if supporting_docs_file and supporting_docs_file.filename: # Check if file was actually provided
        supporting_docs_path = save_file(supporting_docs_file, upload_folder)
        # Optionally handle error if supporting_docs_path couldn't be saved

    try:
        submission = Submission(
            user_id=user_id,
            track_id=track_id,
            model_file_url=model_file_path,
            supporting_docs_url=supporting_docs_path,
            status='Pending'
        )
        db.session.add(submission)
        db.session.commit()
    except Exception as e:
        # Log the exception e for server-side debugging
        current_app.logger.error(f"Error creating submission: {e}")
        db.session.rollback()
        return jsonify({'success': False, 'message': 'An error occurred while creating the submission.'}), 500

    return jsonify({'success': True, 'message': 'Submission created successfully', 'submission_id': submission.id}), 201

@submissions_bp.route('/', methods=['GET'])
def get_all_submissions():
    """
    Retrieve all submissions.
    No input data to validate with Marshmallow here.
    """
    try:
        submissions = Submission.query.all()
        return jsonify([{
            'id': sub.id,
            'user_id': sub.user_id,
            'track_id': sub.track_id,
            'status': sub.status,
            'submission_date': sub.submission_date.isoformat() if sub.submission_date else None
        } for sub in submissions]), 200
    except Exception as e:
        current_app.logger.error(f"Error getting all submissions: {e}")
        return jsonify({'success': False, 'error': 'Could not retrieve submissions.'}), 500

@submissions_bp.route('/<int:user_id>', methods=['GET'])
@jwt_required()
def get_user_submissions(user_id):
    """
    Retrieve all submissions for a specific user.
    Path parameter 'user_id' is validated by Flask's routing.
    Only the user themselves (based on their JWT) can access their submissions.
    """
    current_user_id = get_jwt_identity()
    if int(current_user_id) != user_id: # Ensure type consistency for comparison
        return jsonify({'success': False, 'message': 'Unauthorized'}), 403

    try:
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
    except Exception as e:
        current_app.logger.error(f"Error getting submissions for user {user_id}: {e}")
        return jsonify({'success': False, 'error': 'Could not retrieve user submissions.'}), 500

@submissions_bp.route('/detail/<int:submission_id>', methods=['GET'])
@jwt_required()
def get_submission(submission_id):
    """
    Retrieve a specific submission by its ID.
    Path parameter 'submission_id' is validated by Flask's routing.
    Ensures the requesting user is the owner.
    """
    current_user_id = get_jwt_identity()
    try:
        submission = Submission.query.get(submission_id)
        if not submission:
            return jsonify({'success': False, 'message': 'Submission not found'}), 404
        
        if submission.user_id != int(current_user_id): # Ensure type consistency
            return jsonify({'success': False, 'message': 'Unauthorized'}), 403
            
        submission_data = {
            'id': submission.id,
            'track_id': submission.track_id,
            'submission_date': submission.submission_date.isoformat() if submission.submission_date else None,
            'model_file_url': submission.model_file_url,
            'supporting_docs_url': submission.supporting_docs_url,
            'status': submission.status
        }
        return jsonify(submission_data), 200
    except Exception as e:
        current_app.logger.error(f"Error getting submission detail {submission_id}: {e}")
        return jsonify({'success': False, 'error': 'Could not retrieve submission details.'}), 500

