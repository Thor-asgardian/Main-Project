function calculateModulus() {
    const dividend = parseFloat(document.getElementById('dividend').value);
    const divisor = parseFloat(document.getElementById('divisor').value);
  
    if (isNaN(dividend) || isNaN(divisor) || divisor === 0) {
      document.getElementById('result').innerHTML = 'Invalid input!';
      return;
    }
  
    const remainder = dividend % divisor;
    document.getElementById('result').innerHTML = `The remainder of ${dividend} divided by ${divisor} is ${remainder}`;
  }
  