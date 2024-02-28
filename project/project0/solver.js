function shuffleArrayWithRange(start, end) {
    const resultArray = [];

    // Populate array with values from start to end
    for (let i = start; i <= end; i++) {
        resultArray.push(i);
    }

    // Fisher-Yates shuffle
    for (let i = resultArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [resultArray[i], resultArray[j]] = [resultArray[j], resultArray[i]];
    }

    return resultArray;
}

function solveSudoku(board) {
    const emptySpot = findEmptySpot(board);

    // If there are no empty spots, the puzzle is solved
    if (!emptySpot) {
        console.log(board)
        return true;
    }

    const [row, col] = emptySpot;

    for (let num = 1; num <= 9; num++) {
        if (isValid(board, row, col, num)) {
            board[row][col] = num;

            if (solveSudoku(board)) {
                return true; // If a solution is found, stop further exploration
            }

            // If the current placement doesn't lead to a solution, backtrack
            board[row][col] = 0;
        }
    }

    // No solution found for this configuration
    return false;
}

function findEmptySpot(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
                return [row, col];
            }
        }
    }
    return null; // If there are no empty spots
}

function isValid(board, row, col, num) {
    // Check if the number is not present in the current row and column
    for (let i = 0; i < 9; i++) {
        if (board[row][i] === num || board[i][col] === num) {
            return false;
        }
    }

    // Check if the number is not present in the current 3x3 subgrid
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[startRow + i][startCol + j] === num) {
                return false;
            }
        }
    }
    // If the number is not conflicting, it is a valid placement
    return true;
}

function generateSudokuPuzzle(n) {
    // Create a solved Sudoku board
    const first_row = shuffleArrayWithRange(1, 9)
    let solvedBoard = []
    solvedBoard.push(first_row);
    for (let i = 0; i < 8; i++){
        solvedBoard.push([0, 0, 0, 0, 0, 0, 0, 0, 0])
    }
    solveSudoku(solvedBoard);

    // Create a deep copy of the solved board
    const puzzle = solvedBoard.map(row => row.slice());

    // Determine the number of cells to be removed to create the puzzle
    const cellsToRemove = Math.floor(Math.random() * (5 * n)) + (10 * n); // Adjust the range as needed

    // Remove cells to create the puzzle
    for (let i = 0; i < cellsToRemove; i++) {
        let row, col;
        do {
            // Generate random coordinates
            row = Math.floor(Math.random() * 9);
            col = Math.floor(Math.random() * 9);
        } while (puzzle[row][col] === 0);

        // Remove the number at the chosen coordinates
        puzzle[row][col] = 0;
    }

    return {puzzle:puzzle, answer:solvedBoard};
}