function generateSubjectFields() {
  const numSubjects = document.getElementById("numSubjects").value;
  const container = document.getElementById("subjectsContainer");
  container.innerHTML = ""; // Clear previous fields

  for (let i = 1; i <= numSubjects; i++) {
    const div = document.createElement("div");
    div.innerHTML = `
                    <label>Grade ${i}:</label>
                    <input type="text" id="grade${i}" name="grade${i}">
                    <label>Credits ${i}:</label>
                    <input type="number" id="credits${i}" name="credits${i}">
                `;
    container.appendChild(div);
  }
}

function calculateGPA() {
  const numSubjects = document.getElementById("numSubjects").value;
  let totalPoints = 0;
  let totalCredits = 0;

  const gradePoints = {
    S: 10.0,
    A: 9.0,
    B: 8.0,
    C: 7.0,
    D: 6.0,
    E: 5.0,
    F: 0.0,
  };

  for (let i = 1; i <= numSubjects; i++) {
    const grade = document.getElementById(`grade${i}`).value;
    const credits = parseFloat(document.getElementById(`credits${i}`).value);

    if (gradePoints[grade] !== undefined && !isNaN(credits)) {
      totalPoints += gradePoints[grade] * credits;
      totalCredits += credits;
    }
  }

  const gpa = totalPoints / totalCredits;
  document.getElementById("result").innerText = "Your GPA: " + gpa.toFixed(2);
}

// Initialize with one subject field
generateSubjectFields();
