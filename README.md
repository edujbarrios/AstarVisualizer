# A* Algorithm Visualizer

## Overview

This project is a visualizer for the A* pathfinding algorithm. It provides a visual representation of how the algorithm works and allows you to configure various parameters such as speed, heuristic, grid size, cell size, and visualization style.

## Features

- **Speed Control**: Choose between fast, medium, and slow visualization speeds.
- **Heuristic Selection**: Select between Manhattan, Euclidean, and Chebyshev heuristics.
- **Grid Size**: Configure the grid size to be 20x20, 30x30, or 40x40.
- **Cell Size**: Adjust the size of each cell to 20px, 30px, or 40px.
- **Visualization Style**: Choose between default, blue, and dark themes.
- **Path Highlighting**: The shortest path found by the algorithm is highlighted in yellow.
- **Performance Timer**: Displays the time taken to compute the path.

## How to Use

1. **Select Speed**: Choose the speed at which you want the algorithm to be visualized (Fast, Medium, Slow).
2. **Select Heuristic**: Select the heuristic function to be used (Manhattan, Euclidean, Chebyshev).
3. **Grid Size**: Select the size of the grid (20x20, 30x30, 40x40).
4. **Cell Size**: Select the size of each cell (20px, 30px, 40px).
5. **Visualization Style**: Choose the style of visualization (Default, Blue Theme, Dark Theme).
6. **Visualize A***: Click this button to start the visualization of the A* algorithm.
7. **Reset**: Click this button to reset the grid to its initial state.

## Algorithm Description

The A* algorithm is a pathfinding and graph traversal algorithm, which is often used in computer science due to its performance and accuracy. It finds the shortest path from a start node to a goal node by using a heuristic to estimate the cost to reach the goal from the current node.

### Key Features

- **Heuristic Function**: Uses a heuristic function to guide the search towards the goal.
- **Combines Dijkstra and Greedy Best-First Search**: Combines the benefits of Dijkstra's Algorithm and Greedy Best-First-Search.
- **Complete and Optimal**: It is complete and optimal, meaning it will always find the shortest path if one exists.

### How it Works

1. **Initialization**: The algorithm starts with the initial node and explores neighboring nodes.
2. **Priority Queue**: Maintains a priority queue of nodes to be explored, prioritizing nodes with the lowest estimated total cost (current cost + estimated cost to goal).
3. **Path Building**: As it explores nodes, it builds the optimal path incrementally, guaranteeing the shortest path is found if one exists.

## Running the Project

To run the project, simply open the `index.html` file in your web browser.

## License

This project is open source and available under the [MIT License](LICENSE).

## Author

Made by [edujbarrios](https://github.com/edujbarrios).
