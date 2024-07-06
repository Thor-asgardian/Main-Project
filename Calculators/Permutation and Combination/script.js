function factorial(n) {
    if (n === 0 || n === 1) {
        return 1;
    }
    return n * factorial(n - 1);
}

function calculatePermutation(n, r) {
    return factorial(n) / factorial(n - r);
}

function calculateCombination(n, r) {
    return factorial(n) / (factorial(r) * factorial(n - r));
}

function calculate() {
    const n = parseInt(document.getElementById('n').value);
    const r = parseInt(document.getElementById('r').value);
    const choice = document.querySelector('input[name="choice"]:checked');

    if (isNaN(n) || isNaN(r)) {
        alert("Please enter valid numbers for n and r.");
        return;
    }

    if (n < 0 || r < 0) {
        alert("n and r must be non-negative integers.");
        return;
    }

    if (r > n) {
        alert("r must be less than or equal to n.");
        return;
    }

    if (!choice) {
        alert("Please select a calculation method (Permutation or Combination).");
        return;
    }

    let result;
    if (choice.value === "permutation") {
        result = calculatePermutation(n, r);
        document.getElementById('result').textContent = `Permutations (P): ${result}`;
    } else if (choice.value === "combination") {
        result = calculateCombination(n, r);
        document.getElementById('result').textContent = `Combinations (C): ${result}`;
    }
}