function calculateGPA() {
    const grades = [
        document.getElementById('grade1').value,
        document.getElementById('grade2').value,
        document.getElementById('grade3').value,
        document.getElementById('grade4').value
    ];
    const credits = [
        parseFloat(document.getElementById('credits1').value),
        parseFloat(document.getElementById('credits2').value),
        parseFloat(document.getElementById('credits3').value),
        parseFloat(document.getElementById('credits4').value)
    ];
    
    const gradePoints = {
        'S': 10.0,
        'A': 9.0,
        'B': 8.0,
        'C': 7.0,
        'D': 6.0,
        'E': 5.0,
        'F': 0.0
    };
    
    let totalPoints = 0;
    let totalCredits = 0;
    
    for (let i = 0; i < grades.length; i++) {
        totalPoints += gradePoints[grades[i]] * credits[i];
        totalCredits += credits[i];
    }
    
    const gpa = totalPoints / totalCredits;
    
    document.getElementById('result').innerText = 'Your GPA: ' + gpa.toFixed(2);
}