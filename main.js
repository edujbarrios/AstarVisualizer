document.addEventListener("DOMContentLoaded", () => {
    createGrid();
    document.getElementById('gridSizeSelect').addEventListener('change', createGrid);
    document.getElementById('cellSizeSelect').addEventListener('change', updateGridStyle);
    document.getElementById('styleSelect').addEventListener('change', updateGridStyle);
});

function createGrid() {
    const gridSize = parseInt(document.getElementById('gridSizeSelect').value, 10);
    const gridElement = document.getElementById('grid');
    gridElement.innerHTML = '';
    gridElement.style.gridTemplateColumns = `repeat(${gridSize}, ${getCellSize()}px)`;
    
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.id = `cell-${row}-${col}`;
            cell.onclick = () => toggleWall(row, col);
            gridElement.appendChild(cell);
        }
    }
    setStartAndEnd(gridSize);
    updateGridStyle();
}

function getCellSize() {
    return parseInt(document.getElementById('cellSizeSelect').value, 10);
}

function toggleWall(row, col) {
    const cell = document.getElementById(`cell-${row}-${col}`);
    if (cell.classList.contains('start') || cell.classList.contains('end')) return;
    cell.classList.toggle('wall');
}

function setStartAndEnd(gridSize) {
    document.getElementById(`cell-0-0`).classList.add('start');
    document.getElementById(`cell-${gridSize - 1}-${gridSize - 1}`).classList.add('end');
}

function resetGrid() {
    const gridSize = parseInt(document.getElementById('gridSizeSelect').value, 10);
    const cells = document.getElementsByClassName('cell');
    for (let cell of cells) {
        cell.className = 'cell';
    }
    setStartAndEnd(gridSize);
}

async function visualizeAStar() {
    const gridSize = parseInt(document.getElementById('gridSizeSelect').value, 10);
    const grid = [];
    for (let row = 0; row < gridSize; row++) {
        const rowArray = [];
        for (let col = 0; col < gridSize; col++) {
            rowArray.push(document.getElementById(`cell-${row}-${col}`).classList.contains('wall') ? 1 : 0);
        }
        grid.push(rowArray);
    }
    const start = { row: 0, col: 0 };
    const end = { row: gridSize - 1, col: gridSize - 1 };
    const speed = parseInt(document.getElementById('speedSelect').value, 10);
    const heuristic = document.getElementById('heuristicSelect').value;

    const startTime = performance.now();
    await aStar(grid, start, end, speed, heuristic);
    const endTime = performance.now();

    document.getElementById('timeCounter').innerText = `Time: ${(endTime - startTime).toFixed(2)} ms`;
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function updateGridStyle() {
    const cellSize = getCellSize();
    const style = document.getElementById('styleSelect').value;
    const styleElement = document.getElementById('grid-style');
    let newStyles = `
        .grid {
            display: grid;
            grid-template-columns: repeat(${document.getElementById('gridSizeSelect').value}, ${cellSize}px);
            gap: 1px;
        }
        .cell {
            width: ${cellSize}px;
            height: ${cellSize}px;
            border: 1px solid #ccc;
        }
        .start {
            background-color: green;
        }
        .end {
            background-color: red;
        }
        .wall {
            background-color: black;
        }
        .path {
            background-color: yellow;
        }
        .open {
            background-color: lightgreen;
        }
        .closed {
            background-color: lightcoral;
        }
    `;

    if (style === 'blue') {
        newStyles += `
            .start {
                background-color: darkblue;
            }
            .end {
                background-color: blue;
            }
            .path {
                background-color: lightblue;
            }
            .open {
                background-color: skyblue;
            }
            .closed {
                background-color: royalblue;
            }
        `;
    } else if (style === 'dark') {
        newStyles += `
            .start {
                background-color: darkgreen;
            }
            .end {
                background-color: darkred;
            }
            .path {
                background-color: gold;
            }
            .open {
                background-color: darkseagreen;
            }
            .closed {
                background-color: darksalmon;
            }
        `;
    }

    styleElement.innerHTML = newStyles;
}
