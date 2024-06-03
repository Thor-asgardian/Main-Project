document.getElementById('prediction-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const pregnancies = parseFloat(document.getElementById('pregnancies').value);
    const glucose = parseFloat(document.getElementById('glucose').value);
    const bloodPressure = parseFloat(document.getElementById('bloodPressure').value);
    const skinThickness = parseFloat(document.getElementById('skinThickness').value);
    const insulin = parseFloat(document.getElementById('insulin').value);
    const bmi = parseFloat(document.getElementById('bmi').value);
    const dpf = parseFloat(document.getElementById('dpf').value);
    const age = parseFloat(document.getElementById('age').value);

    // Example input data
    const input_data = [pregnancies, glucose, bloodPressure, skinThickness, insulin, bmi, dpf, age];

    // Normally you would send input_data to your backend for prediction, 
    // Here we simulate a result for demonstration purposes.
    const mock_prediction = Math.random() > 0.5 ? 1 : 0; // Randomly simulating a prediction

    const resultDiv = document.getElementById('result');
    if (mock_prediction === 0) {
        resultDiv.textContent = "The person is not diabetic.";
        resultDiv.style.color = "green";
    } else {
        resultDiv.textContent = "The person is diabetic.";
        resultDiv.style.color = "red";
    }
});