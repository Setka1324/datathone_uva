# backend/routes/tracks.py
from flask import Blueprint, jsonify, abort
from models import db, Track, Dataset

tracks_bp = Blueprint('tracks', __name__)

@tracks_bp.route('/', methods=['GET'])
def get_tracks():
    try:
        tracks = Track.query.all()
        return jsonify([{
            'id': track.id,
            'name': track.name,
            'description': track.description,
            'rules': track.rules
        } for track in tracks]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@tracks_bp.route('/<int:track_id>', methods=['GET'])
def get_track(track_id):
    """Endpoint to get details for a specific track, including its datasets."""
    track = Track.query.get(track_id)
    if not track:
        abort(404, description="Track not found")
    datasets = Dataset.query.filter_by(track_id=track_id).all()
    datasets_list = []
    for dataset in datasets:
        datasets_list.append({
            'id': dataset.id,
            'dataset_name': dataset.dataset_name,
            'description': dataset.description,
            'file_url': dataset.file_url
        })
    return jsonify({
        'id': track.id,
        'name': track.name,
        'description': track.description,
        'rules': track.rules,
        'datasets': datasets_list
    }), 200
