import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, accuracy_score
import tensorflow_decision_forests as tfdf
import joblib

def load_and_explore_data():
    """Load and explore the dataset"""
    df = pd.read_csv('stunting_generated.csv')
    print("Dataset shape:", df.shape)
    print("\nFirst few rows:")
    print(df.head())
    print("\nTarget distributions:")
    print("Stunting:", df['Stunting'].value_counts())
    print("\nWasting:", df['Wasting'].value_counts())
    return df

def preprocess_data(df):
    """Preprocess the data for machine learning"""
    processed_df = df.copy()
    
    # Encode gender
    gender_encoder = LabelEncoder()
    processed_df['Jenis_Kelamin_Encoded'] = gender_encoder.fit_transform(df['Jenis Kelamin'])
    
    # Encode target variables
    stunting_encoder = LabelEncoder()
    wasting_encoder = LabelEncoder()
    
    processed_df['Stunting_Encoded'] = stunting_encoder.fit_transform(df['Stunting'])
    processed_df['Wasting_Encoded'] = wasting_encoder.fit_transform(df['Wasting'])
    
    # Select features for modeling
    feature_columns = ['Jenis_Kelamin_Encoded', 'Umur (bulan)', 'Tinggi Badan (cm)', 'Berat Badan (kg)']
    X = processed_df[feature_columns]
    
    # Scale features
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    
    return X_scaled, processed_df['Stunting_Encoded'], processed_df['Wasting_Encoded'], gender_encoder, stunting_encoder, wasting_encoder, scaler

def train_models(X, y_stunting, y_wasting):
    """Train the machine learning models"""
    # Split data
    X_train, X_test, y_stunting_train, y_stunting_test, y_wasting_train, y_wasting_test = train_test_split(
        X, y_stunting, y_wasting, test_size=0.2, random_state=42
    )
    
    # Train Stunting model
    stunting_model = tfdf.keras.RandomForestModel(task=tfdf.keras.Task.CLASSIFICATION, num_trees=100, random_seed=42)
    stunting_model.fit(X_train, y_stunting_train)
    stunting_model.summary()

    # Train Wasting model
    wasting_model = tfdf.keras.RandomForestModel(task=tfdf.keras.Task.CLASSIFICATION, num_trees=100, random_seed=42)
    wasting_model.fit(X_train, y_wasting_train)
    wasting_model.summary()

    # Evaluate models
    stunting_pred_probs = stunting_model.predict(X_test)
    stunting_pred = np.argmax(stunting_pred_probs, axis=1)

    wasting_pred_probs = wasting_model.predict(X_test)
    wasting_pred = np.argmax(wasting_pred_probs, axis=1)
    
    print("\n=== MODEL EVALUATION ===")
    print("Stunting Model Accuracy:", accuracy_score(y_stunting_test, stunting_pred))
    print("Stunting Model Classification Report:\n", classification_report(y_stunting_test, stunting_pred))
    print("Wasting Model Accuracy:", accuracy_score(y_wasting_test, wasting_pred))
    print("Wasting Model Classification Report:\n", classification_report(y_wasting_test, wasting_pred))
    
    return stunting_model, wasting_model

def save_models(stunting_model, wasting_model, gender_encoder, stunting_encoder, wasting_encoder, scaler):
    # Save TFDF models using their native Keras save method
    stunting_model.save('stunting_model_tfdf')
    wasting_model.save('wasting_model_tfdf')

    # Save encoders and scaler using joblib
    joblib.dump(gender_encoder, 'gender_encoder.pkl')
    joblib.dump(stunting_encoder, 'stunting_encoder.pkl')
    joblib.dump(wasting_encoder, 'wasting_encoder.pkl')
    joblib.dump(scaler, 'scaler.pkl')

    print("\nAll models and encoders saved successfully!")

def main():
    print("Starting model training...")
    
    # Load data
    df = load_and_explore_data()
    
    # Preprocess data
    X, y_stunting, y_wasting, gender_encoder, stunting_encoder, wasting_encoder, scaler = preprocess_data(df)
    
    # Train models
    stunting_model, wasting_model = train_models(X, y_stunting, y_wasting)
    
    # Save everything
    save_models(stunting_model, wasting_model, gender_encoder, stunting_encoder, wasting_encoder, scaler)
    
    print("\n=== TRAINING COMPLETED ===")
    print("Files created:")
    print("- stunting_model_tfdf")
    print("- wasting_model_tfdf") 
    print("- gender_encoder.pkl")
    print("- stunting_encoder.pkl")
    print("- wasting_encoder.pkl")
    print("- scaler.pkl")
    print("\nYou can now run the Flask app with: python app.py")

if __name__ == "__main__":
    main()