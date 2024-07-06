function calculateRoots() {
    let a = parseFloat(document.getElementById('a').value);
    let b = parseFloat(document.getElementById('b').value);
    let c = parseFloat(document.getElementById('c').value);

    let resultDiv = document.getElementById('result');
    resultDiv.innerHTML = "";

    if (isNaN(a) || isNaN(b) || isNaN(c)) {
        resultDiv.innerHTML = "Please enter valid numbers for a, b, and c.";
        return;
    }

    let discriminant = b * b - 4 * a * c;
    if (discriminant > 0) {
        let root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
        let root2 = (-b - Math.sqrt(discriminant)) / (2 * a);
        resultDiv.innerHTML = `Roots are real and different: Root 1 = ${root1}, Root 2 = ${root2}`;
    } else if (discriminant === 0) {
        let root = -b / (2 * a);
        resultDiv.innerHTML = `Roots are real and same: Root = ${root}`;
    } else {
        let realPart = (-b / (2 * a)).toFixed(2);
        let imaginaryPart = (Math.sqrt(-discriminant) / (2 * a)).toFixed(2);
        resultDiv.innerHTML = `Roots are complex: Root 1 = ${realPart} + ${imaginaryPart}i, Root 2 = ${realPart} - ${imaginaryPart}i`;
    }
}