function calculateMileage() {
    const distance = document.getElementById('distance').value;
    const fuel = document.getElementById('fuel').value;

    if (distance && fuel) {
        const mileage = (distance / fuel).toFixed(2);
        document.getElementById('result').innerText = `Mileage: ${mileage} km/l`;
    } else {
        document.getElementById('result').innerText = 'Please enter both distance and fuel used.';
    }
}