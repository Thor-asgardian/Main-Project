from flask import Flask, request, jsonify, send_from_directory
import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn import svm
from sklearn.metrics import accuracy_score
import joblib
from flask_cors import CORS

# Initialize the Flask application
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load and preprocess the dataset
diabetes_dataset = pd.read_csv("diabetes.csv")

# Separate the data and labels
X = diabetes_dataset.drop(columns='Outcome', axis=1)
Y = diabetes_dataset['Outcome']

# Standardize the data
scaler = StandardScaler()
scaler.fit(X)
X = scaler.transform(X)

# Split the data into training and test sets
X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.2, stratify=Y, random_state=42)

# Initialize the SVM classifier with a polynomial kernel
classifier = svm.SVC(kernel='poly', degree=3)

# Train the SVM classifier
classifier.fit(X_train, Y_train)

# Save the trained model and scaler
joblib.dump(classifier, 'svm_model.pkl')
joblib.dump(scaler, 'scaler.pkl')

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/predict', methods=['POST'])
def predict():
    # Get the input data from the request
    input_data = request.json.get('input_data')
    if input_data is None:
        return jsonify({'error': 'No input data provided'}), 400

    input_data_as_numpy_array = np.asarray(input_data)

    # Reshape and standardize the input data
    input_data_reshaped = input_data_as_numpy_array.reshape(1, -1)
    std_data = scaler.transform(input_data_reshaped)

    # Make a prediction
    prediction = classifier.predict(std_data)

    # Return the result as JSON
    result = 'diabetic' if prediction[0] == 1 else 'not diabetic'
    return jsonify({'prediction': result})

if __name__ == '__main__':
    app.run(debug=True)
