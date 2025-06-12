from flask import Flask, request, render_template, jsonify
import joblib
import numpy as np
import os
import requests
import json
import tensorflow as tf
import tensorflow_decision_forests as tfdf
import keras
from keras.layers import TFSMLayer
import logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Get the directory where this script is located
# basedir = os.path.abspath(os.path.dirname(__file__))
basedir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))

# Create Flask app with explicit template folder path
app = Flask(__name__,
            template_folder=os.path.join(basedir, 'templates'),
            static_folder=os.path.join(basedir, 'static'))

# Load models and encoders when the app starts
def load_models():
    try:
        logger.info("Loading models...")
        models = {
            'stunting_model': TFSMLayer(os.path.join(basedir, 'stunting_model_tfdf'), call_endpoint="serving_default"),
            'wasting_model': TFSMLayer(os.path.join(basedir, 'wasting_model_tfdf'), call_endpoint="serving_default"),
            'gender_encoder': joblib.load(os.path.join(basedir, 'gender_encoder.pkl')),
            'stunting_encoder': joblib.load(os.path.join(basedir, 'stunting_encoder.pkl')),
            'wasting_encoder': joblib.load(os.path.join(basedir, 'wasting_encoder.pkl')),
            'scaler': joblib.load(os.path.join(basedir, 'scaler.pkl'))
        }
        logger.info("All models loaded successfully!")
        return models
    except Exception as e:
        logger.error(f"Error loading models: {str(e)}", exc_info=True)
        return None

# Load models at startup
models = load_models()

# ROUTES FOR ALL PAGES
@app.route('/')
def home():
    """Home page - index.html"""
    return render_template('index.html')

@app.route('/index.html')
def index():
    """Alternative route for index page"""
    return render_template('index.html')

@app.route('/stunting.html')
def stunting():
    """Stunting calculator page"""
    return render_template('stunting.html')

@app.route('/articel.html')
def articel():
    """Article page"""
    return render_template('articel.html')

@app.route('/articleDetail.html')
def article_detail():
    """Article detail page"""
    return render_template('articleDetail.html')

@app.route('/bmi.html')
def bmi_redirect():
    """BMI redirect page"""
    return render_template('bmi.html')

@app.route('/bmi_redirect.html')
def bmi_redirect_alt():
    """Alternative BMI redirect page"""
    return render_template('bmi_redirect.html')

# PREDICTION ROUTES
@app.route('/predict', methods=['POST'])
def predict():
    """Handle prediction requests - returns HTML page"""
    if models is None:
        return render_template('error.html', 
                             error="Models not loaded. Please run train_model.py first.")
    
    try:
        # Get data from form
        gender = request.form['gender']
        age_months = float(request.form['age_months'])
        height_cm = float(request.form['height_cm'])
        weight_kg = float(request.form['weight_kg'])
        
        # Validate inputs
        if not all([gender, age_months >= 0, height_cm > 0, weight_kg > 0]):
            raise ValueError("Invalid input values. Please check your entries.")
        
        # Make prediction
        prediction_result = make_prediction(gender, age_months, height_cm, weight_kg)
        
        return render_template('result.html', 
                             stunting_result=prediction_result['stunting_result'],
                             wasting_result=prediction_result['wasting_result'],
                             stunting_confidence=prediction_result['stunting_confidence'],
                             wasting_confidence=prediction_result['wasting_confidence'],
                             input_data={
                                 'gender': gender,
                                 'age_months': age_months,
                                 'height_cm': height_cm,
                                 'weight_kg': weight_kg
                             })
    
    except Exception as e:
        return render_template('error.html', error=str(e))

@app.route('/predict_json', methods=['POST'])
def predict_json():
    """Handle AJAX prediction requests - returns JSON"""
    if models is None:
        logger.error("Models not loaded")
        return jsonify({'error': 'Models not loaded'}), 500
    
    try:
        # Get data from JSON request
        data = request.get_json()
        logger.debug(f"Received data: {data}")
        
        gender = data['gender']
        age_months = float(data['age_months'])
        height_cm = float(data['height_cm'])
        weight_kg = float(data['weight_kg'])
        
        # Validate inputs
        if not all([gender, age_months >= 0, height_cm > 0, weight_kg > 0]):
            logger.warning("Invalid input values")
            return jsonify({'error': 'Invalid input values'}), 400
        
        # Make prediction
        prediction_result = make_prediction(gender, age_months, height_cm, weight_kg)
        logger.debug(f"Prediction result: {prediction_result}")
        
        return jsonify(prediction_result)
    
    except Exception as e:
        logger.error(f"Prediction error: {str(e)}", exc_info=True)
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
    try:
        logger.debug(f"Making prediction for: gender={gender}, age={age_months}, height={height_cm}, weight={weight_kg}")
        
        if not all(key in models for key in ['gender_encoder', 'stunting_model', 'wasting_model', 'scaler']):
            raise ValueError("Required models are not loaded")
            
        # Encode gender and scale features
        gender_encoded = models['gender_encoder'].transform([gender])[0]
        features = np.array([[gender_encoded, age_months, height_cm, weight_kg]])
        features_scaled = models['scaler'].transform(features).astype(np.float32)
        
        logger.debug(f"Scaled features: {features_scaled}")
        
        # Make predictions using both models
        stunting_prediction = models['stunting_model'](features_scaled)
        wasting_prediction = models['wasting_model'](features_scaled)
        
        # Debug model outputs
        logger.debug(f"Stunting prediction raw output: {stunting_prediction}")
        logger.debug(f"Wasting prediction raw output: {wasting_prediction}")
        
        # Get predictions from output_1 key instead of serving_default
        stunting_proba = stunting_prediction['output_1'].numpy()[0]
        wasting_proba = wasting_prediction['output_1'].numpy()[0]
        
        # Get predicted classes - highest probability class
        stunting_pred = "Stunting" if np.argmax(stunting_proba) == 1 else "Normal"
        wasting_pred = "Wasting" if np.argmax(wasting_proba) == 1 else "Normal"
        
        # Get confidence from max probability
        stunting_confidence = float(max(stunting_proba)) * 100
        wasting_confidence = float(max(wasting_proba)) * 100
        
        logger.debug(f"Stunting prediction: {stunting_pred} ({stunting_confidence}%)")
        logger.debug(f"Wasting prediction: {wasting_pred} ({wasting_confidence}%)")
        
        return {
            'stunting_result': stunting_pred,
            'wasting_result': wasting_pred,
            'stunting_confidence': round(stunting_confidence, 1),
            'wasting_confidence': round(wasting_confidence, 1)
        }
        
    except Exception as e:
        logger.error(f"Error in make_prediction: {str(e)}", exc_info=True)
        raise

if __name__ == '__main__':
    # print("Starting Flask application...")
    # print(f"Base directory: {basedir}")
    # print(f"Template folder: {os.path.join(basedir, 'templates')}")
    # print(f"Static folder: {os.path.join(basedir, 'static')}")
    # print("Make sure to run 'python train_model.py' first if you haven't already!")
    app.run(debug=True)