document.getElementById('apForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const a = parseFloat(document.getElementById('firstTerm').value);
  const d = parseFloat(document.getElementById('commonDifference').value);
  const n = parseInt(document.getElementById('termNumber').value);

  if (isNaN(a) || isNaN(d) || isNaN(n)) {
      alert('Please enter valid numbers');
      return;
  }

  const nthTerm = n/2 * (2*a + (n - 1) * d);

  document.getElementById('result').textContent = `The ${n}th term of the AP is ${nthTerm}`;
});