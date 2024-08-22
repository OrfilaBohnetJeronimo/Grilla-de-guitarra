const numRows = 6;
let numCols = 20;
const maxCols = 33; // Máximo de columnas permitidas
const gridContainer = document.getElementById('grid-container');
let cells = [];

const letters = 'EBGDAE'; // Alfabeto

// Crear la grilla
function createGrid(columns) {
    const oldCells = cells.map(row => row.map(cell => cell ? parseInt(cell.dataset.value) : 0)); // Guardar los valores actuales
    
    gridContainer.innerHTML = ''; // Limpiar el grid
    gridContainer.style.gridTemplateColumns = `50px repeat(${columns}, 50px)`; // Agregar columna para las letras de las filas
    cells = []; // Limpiar el array de celdas

    for (let row = 0; row < numRows; row++) {
        cells[row] = [];

        // Crear la letra al inicio de cada fila
        const rowLetter = document.createElement('div');
        rowLetter.classList.add('cell', 'row-number');
        rowLetter.textContent = letters[row]; // Mostrar la letra correspondiente a la fila
        gridContainer.appendChild(rowLetter);

        for (let col = 0; col < columns; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');

            // Restaurar los valores de las celdas
            if (oldCells[row] && oldCells[row][col] !== undefined) {
                cell.dataset.value = oldCells[row][col];
                cell.textContent = oldCells[row][col] === 0 ? "" : oldCells[row][col];
            } else {
                cell.dataset.value = 0;
                cell.textContent = "";
            }

            // Maneja el clic izquierdo (suma)
            cell.addEventListener('click', () => {
                let currentValue = parseInt(cell.dataset.value);
                if (currentValue < 20) {
                    currentValue += 1;
                    cell.dataset.value = currentValue;
                    cell.textContent = currentValue;
                } else {
                    cell.textContent = "";
                    cell.dataset.value = 0; // Resetea el valor
                }
            });

            // Maneja el clic derecho (resta)
            cell.addEventListener('contextmenu', (event) => {
                event.preventDefault(); // Evita el menú contextual del navegador
                let currentValue = parseInt(cell.dataset.value);
                if (currentValue > 0) {
                    currentValue -= 1;
                    cell.dataset.value = currentValue;
                    cell.textContent = currentValue;
                } else {
                    cell.textContent = ""; // No muestra nada si el valor es 0
                }
            });

            gridContainer.appendChild(cell);
            cells[row][col] = cell; // Guarda la celda en el array
        }
    }
}

// Inicializa la grilla con el número de columnas por defecto
createGrid(numCols);

// Maneja el clic en el botón para agregar columna
document.getElementById('add-column').addEventListener('click', () => {
    if (numCols < maxCols) {
        numCols += 1;
        createGrid(numCols);
    }
});

// Maneja el clic en el botón para eliminar columna
document.getElementById('remove-column').addEventListener('click', () => {
    if (numCols > 1) {
        numCols -= 1;
        createGrid(numCols);
    }
});

// Maneja el clic en el botón para descargar la grilla
document.getElementById('download-grid').addEventListener('click', () => {
    html2canvas(gridContainer).then(canvas => {
        // Crea un enlace para descargar la imagen
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'grilla-de-guitarra.png';
        link.click();
    });
});

// Maneja el clic en el botón para borrar todo el contenido de la grilla
document.getElementById('clear-grid').addEventListener('click', () => {
    const cells = document.querySelectorAll('#grid-container .cell:not(.row-number)');
    cells.forEach(cell => {
        cell.textContent = "";
        cell.dataset.value = 0; // Resetea el valor
    });
});
