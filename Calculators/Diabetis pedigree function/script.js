function calculateDPF() {
    const ageRelative1 = parseFloat(document.getElementById('age-relative1').value);
    const relation1 = parseFloat(document.getElementById('relation1').value);
    const diabeticRelative1 = parseInt(document.getElementById('diabetic-relative1').value);

    // Formula for Diabetes Pedigree Function can be complex and vary; here is a simplified version
    const dpf = (ageRelative1 * relation1 * diabeticRelative1) / 100;

    document.getElementById('result').innerText = `Diabetes Pedigree Function: ${dpf.toFixed(2)}`;
}