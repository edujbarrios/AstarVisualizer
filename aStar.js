async function aStar(grid, start, end, speed, heuristic) {
    const openSet = [start];
    const closedSet = [];
    const cameFrom = new Map();
    const gScore = Array(grid.length).fill().map(() => Array(grid.length).fill(Infinity));
    const fScore = Array(grid.length).fill().map(() => Array(grid.length).fill(Infinity));

    gScore[start.row][start.col] = 0;
    fScore[start.row][start.col] = getHeuristic(start, end, heuristic);

    while (openSet.length > 0) {
        openSet.sort((a, b) => fScore[a.row][a.col] - fScore[b.row][b.col]);
        const current = openSet.shift();
        if (current.row === end.row && current.col === end.col) {
            reconstructPath(cameFrom, current);
            return;
        }
        closedSet.push(current);
        document.getElementById(`cell-${current.row}-${current.col}`).classList.add('closed');
        await delay(speed);

        const neighbors = getNeighbors(current, grid);
        for (const neighbor of neighbors) {
            if (closedSet.some(c => c.row === neighbor.row && c.col === neighbor.col)) continue;
            const tentativeGScore = gScore[current.row][current.col] + 1;
            if (tentativeGScore < gScore[neighbor.row][neighbor.col]) {
                cameFrom.set(`${neighbor.row},${neighbor.col}`, current);
                gScore[neighbor.row][neighbor.col] = tentativeGScore;
                fScore[neighbor.row][neighbor.col] = gScore[neighbor.row][neighbor.col] + getHeuristic(neighbor, end, heuristic);
                if (!openSet.some(o => o.row === neighbor.row && o.col === neighbor.col)) {
                    openSet.push(neighbor);
                    document.getElementById(`cell-${neighbor.row}-${neighbor.col}`).classList.add('open');
                }
            }
        }
    }
    alert("No path found!");
}

function getHeuristic(a, b, type) {
    switch (type) {
        case 'manhattan':
            return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
        case 'euclidean':
            return Math.sqrt(Math.pow(a.row - b.row, 2) + Math.pow(a.col - b.col, 2));
        case 'chebyshev':
            return Math.max(Math.abs(a.row - b.row), Math.abs(a.col - b.col));
        default:
            return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
    }
}

function getNeighbors(node, grid) {
    const { row, col } = node;
    const neighbors = [];
    if (row > 0 && grid[row - 1][col] === 0) neighbors.push({ row: row - 1, col: col });
    if (row < grid.length - 1 && grid[row + 1][col] === 0) neighbors.push({ row: row + 1, col: col });
    if (col > 0 && grid[row][col - 1] === 0) neighbors.push({ row: row, col: col - 1 });
    if (col < grid.length - 1 && grid[row][col + 1] === 0) neighbors.push({ row: row, col: col + 1 });
    return neighbors;
}

function reconstructPath(cameFrom, current) {
    const totalPath = [current];
    while (cameFrom.has(`${current.row},${current.col}`)) {
        current = cameFrom.get(`${current.row},${current.col}`);
        totalPath.push(current);
    }
    totalPath.reverse().forEach(node => {
        document.getElementById(`cell-${node.row}-${node.col}`).classList.add('path');
    });
}
