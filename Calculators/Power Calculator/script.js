// script.js
function calculatePower() {
    const base = document.getElementById('base').value;
    const exponent = document.getElementById('exponent').value;
    const result = Math.pow(base, exponent);

    document.getElementById('result').innerText = `Result: ${result}`;
}