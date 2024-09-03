from flask import Flask, request, jsonify, send_from_directory
import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
import joblib
from flask_cors import CORS
import requests
import os

app = Flask(__name__)
CORS(app)

# Define your API URL
api_url = "https://track-api.cynefian.com/api/devicevehicle/fuelusage/vehicleid={}"

def fetch_data(vehicleid):
    try:
        response = requests.get(api_url.format(vehicleid), verify=False)
        response.raise_for_status()
        data = response.json()
        return pd.DataFrame(data)
    except requests.exceptions.RequestException as e:
        raise Exception(f"Failed to fetch data: {e}")

try:
    # Fetch the dataset for the specified vehicle ID
    vehicle_dataset = fetch_data('KA11KE3333')
except Exception as e:
    print(e)
    exit(0)

# Feature matrix X and target vector Y
X = vehicle_dataset.drop(columns=['Need_Maintenance'])
Y = vehicle_dataset['Need_Maintenance']

# Handle categorical variables
categorical_cols = X.select_dtypes(include=['object']).columns
encoder = OneHotEncoder(sparse=False)
encoded_categorical_data = encoder.fit_transform(X[categorical_cols])

# Drop original categorical columns and append encoded data
X = X.drop(columns=categorical_cols)
X = np.hstack((X.values, encoded_categorical_data))

# Standardize the dataset
scaler = StandardScaler()
X = scaler.fit_transform(X)

# Split the data into training and test sets
X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.2, stratify=Y, random_state=42)

# Train the RandomForest classifier
classifier = RandomForestClassifier(n_estimators=100, random_state=42)
classifier.fit(X_train, Y_train)

# Save the trained model, scaler, and encoder
joblib.dump(classifier, 'random_forest_vehicle_model.pkl')
joblib.dump(scaler, 'scaler_vehicle.pkl')
joblib.dump(encoder, 'encoder_vehicle.pkl')

# Load the model, scaler, and encoder (useful for prediction)
classifier = joblib.load('random_forest_vehicle_model.pkl')
scaler = joblib.load('scaler_vehicle.pkl')
encoder = joblib.load('encoder_vehicle.pkl')

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        input_data = request.json.get('input_data')
        if input_data is None:
            return jsonify({'error': 'No input data provided'}), 400

        input_data_as_numpy_array = np.asarray(input_data)

        # Determine the correct length of the numerical and categorical parts
        num_features_len = X.shape[1] - encoded_categorical_data.shape[1]
        if len(input_data_as_numpy_array) != num_features_len + len(categorical_cols):
            return jsonify({'error': f'Input data size does not match model requirements. Expected {num_features_len + len(categorical_cols)}, got {len(input_data_as_numpy_array)}'}), 400

        # Split into numerical and categorical data
        numerical_data = input_data_as_numpy_array[:num_features_len]
        categorical_data = input_data_as_numpy_array[num_features_len:]

        # Encode the categorical data
        categorical_data_encoded = encoder.transform([categorical_data])

        # Combine numerical and encoded categorical data
        input_data_processed = np.hstack((numerical_data, categorical_data_encoded))

        # Standardize the input data
        std_data = scaler.transform(input_data_processed.reshape(1, -1))

        # Predict using the classifier
        prediction = classifier.predict(std_data)
        result = 'requires maintenance' if prediction[0] == 1 else 'does not require maintenance'

        return jsonify({'prediction': result})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    print("Current working directory:", os.getcwd())
    print("Files in current directory:", os.listdir())
    app.run(debug=True)