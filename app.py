from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import os

# Get the directory where this script is located
basedir = os.path.abspath(os.path.dirname(__file__))

# Create Flask app
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Load models and encoders when the app starts
def load_models():
    """Load all trained models and encoders"""
    try:
        models = {
            'stunting_model': joblib.load(os.path.join(basedir, 'stunting_model.pkl')),
            'wasting_model': joblib.load(os.path.join(basedir, 'wasting_model.pkl')),
            'gender_encoder': joblib.load(os.path.join(basedir, 'gender_encoder.pkl')),
            'stunting_encoder': joblib.load(os.path.join(basedir, 'stunting_encoder.pkl')),
            'wasting_encoder': joblib.load(os.path.join(basedir, 'wasting_encoder.pkl')),
            'scaler': joblib.load(os.path.join(basedir, 'scaler.pkl'))
        }
        print("All models loaded successfully!")
        return models
    except FileNotFoundError as e:
        print(f"Model file not found: {e}")
        print("Please run 'python train_model.py' first to create the model files.")
        return None

# Load models at startup
models = load_models()

# PREDICTION ROUTES
@app.route('/predict_json', methods=['POST'])
def predict_json():
    """Handle AJAX prediction requests - returns JSON"""
    if models is None:
        return jsonify({'error': 'Models not loaded'}), 500
    
    try:
        # Get data from JSON request
        data = request.get_json()
        gender = data['gender']
        age_months = float(data['age_months'])
        height_cm = float(data['height_cm'])
        weight_kg = float(data['weight_kg'])
        
        # Validate inputs
        if not all([gender, age_months >= 0, height_cm > 0, weight_kg > 0]):
            return jsonify({'error': 'Invalid input values'}), 400
        
        # Make prediction
        prediction_result = make_prediction(gender, age_months, height_cm, weight_kg)
        
        return jsonify(prediction_result)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/chat', methods=['POST'])
def chat_local():
    """Handle chatbot requests using local AI implementation"""
    try:
        # For backward compatibility, return a message that directs to local AI
        return jsonify({
            'response': 'Asisten AI kini dijalankan secara lokal melalui JavaScript. Interaksi tidak memerlukan server.',
            'success': True
        })
    except Exception as e:
        print(f"Chat error: {e}")
        return jsonify({
            'response': 'Terjadi kesalahan sistem. Silakan gunakan fitur AI lokal.',
            'success': False
        })

def make_prediction(gender, age_months, height_cm, weight_kg):
    """Make ML prediction and return results"""
    # Encode gender
    gender_encoded = models['gender_encoder'].transform([gender])[0]
    
    # Prepare features
    features = np.array([[gender_encoded, age_months, height_cm, weight_kg]])
    features_scaled = models['scaler'].transform(features)
    
    # Make predictions
    stunting_pred_encoded = models['stunting_model'].predict(features_scaled)[0]
    wasting_pred_encoded = models['wasting_model'].predict(features_scaled)[0]
    
    # Decode predictions
    stunting_pred = models['stunting_encoder'].inverse_transform([stunting_pred_encoded])[0]
    wasting_pred = models['wasting_encoder'].inverse_transform([wasting_pred_encoded])[0]
    
    # Get prediction probabilities
    stunting_proba = models['stunting_model'].predict_proba(features_scaled)[0]
    wasting_proba = models['wasting_model'].predict_proba(features_scaled)[0]
    
    return {
        'stunting_result': stunting_pred,
        'wasting_result': wasting_pred,
        'stunting_confidence': round(max(stunting_proba) * 100, 1),
        'wasting_confidence': round(max(wasting_proba) * 100, 1)
    }

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 8080))
    print("Starting Flask backend API only...")
    app.run(debug=True, host='0.0.0.0', port=port)