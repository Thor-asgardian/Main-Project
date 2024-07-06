function createMatrixInput() {
    const size = document.getElementById('matrix-size').value;
    const container = document.getElementById('matrix-input');
    container.innerHTML = '';

    const table1 = document.createElement('table');
    const table2 = document.createElement('table');

    const matrices = [table1, table2];
    for (let k = 0; k < 2; k++) {
        for (let i = 0; i < size; i++) {
            const row = document.createElement('tr');
            for (let j = 0; j < size; j++) {
                const cell = document.createElement('td');
                const input = document.createElement('input');
                input.type = 'number';
                input.id = `matrix${k + 1}-cell-${i}-${j}`;
                cell.appendChild(input);
                row.appendChild(cell);
            }
            matrices[k].appendChild(row);
        }
        container.appendChild(matrices[k]);
    }
}

function getMatrix(matrixId) {
    const size = document.getElementById('matrix-size').value;
    const matrix = [];

    for (let i = 0; i < size; i++) {
        const row = [];
        for (let j = 0; j < size; j++) {
            const value = document.getElementById(`${matrixId}-cell-${i}-${j}`).value;
            row.push(parseFloat(value));
        }
        matrix.push(row);
    }

    return matrix;
}

function calculateTranspose() {
    const matrix = getMatrix('matrix1');
    const size = matrix.length;
    const transpose = [];

    for (let i = 0; i < size; i++) {
        const row = [];
        for (let j = 0; j < size; j++) {
            row.push(matrix[j][i]);
        }
        transpose.push(row);
    }

    displayResult(transpose, 'Transpose');
}

function calculateInverse() {
    const matrix = getMatrix('matrix1');
    const inverse = math.inv(matrix);

    displayResult(inverse, 'Inverse');
}

function calculateAddition() {
    const matrix1 = getMatrix('matrix1');
    const matrix2 = getMatrix('matrix2');
    const size = matrix1.length;
    const result = [];

    for (let i = 0; i < size; i++) {
        const row = [];
        for (let j = 0; j < size; j++) {
            row.push(matrix1[i][j] + matrix2[i][j]);
        }
        result.push(row);
    }

    displayResult(result, 'Addition');
}

function calculateSubtraction() {
    const matrix1 = getMatrix('matrix1');
    const matrix2 = getMatrix('matrix2');
    const size = matrix1.length;
    const result = [];

    for (let i = 0; i < size; i++) {
        const row = [];
        for (let j = 0; j < size; j++) {
            row.push(matrix1[i][j] - matrix2[i][j]);
        }
        result.push(row);
    }

    displayResult(result, 'Subtraction');
}

function calculateMultiplication() {
    const matrix1 = getMatrix('matrix1');
    const matrix2 = getMatrix('matrix2');
    const result = math.multiply(matrix1, matrix2);

    displayResult(result, 'Multiplication');
}

function displayResult(resultMatrix, title) {
    const container = document.getElementById('result');
    container.innerHTML = `<h2>${title}</h2>`;

    const table = document.createElement('table');

    resultMatrix.forEach(row => {
        const tr = document.createElement('tr');
        row.forEach(cell => {
            const td = document.createElement('td');
            td.textContent = cell.toFixed(2);
            tr.appendChild(td);
        });
        table.appendChild(tr);
    });

    container.appendChild(table);
}

// Import math.js library for matrix operations
const script = document.createElement('script');
script.src = 'https://cdnjs.cloudflare.com/ajax/libs/mathjs/9.5.2/math.min.js';
document.head.appendChild(script);