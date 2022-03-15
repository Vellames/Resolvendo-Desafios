const exist = function(board, word) {
    if (word.length == 0) {
        return false;
    }
    
    const totalRows = board.length
    const totalColumns = board[0].length;

    const dfs = (currentRow, currentColumn, pos = 0) => {
        // Check empty
        if (
            currentRow === totalRows || // Out of bounds, no existing row
            currentRow < 0 || // Out of bounds, negative row
            currentColumn === totalColumns || // Out of bounds, no existing column
            currentColumn < 0 || // Out of bounds, negative column
            board[currentRow][currentColumn] !== word[pos] // Different letter
        ) {
            return false;
        }
        
        // Path exists
        if (pos === word.length - 1) {
            return true;
        }
        
        board[currentRow][currentColumn] = "#";
        const found = 
            dfs(currentRow + 1, currentColumn, pos + 1) || // Down
            dfs(currentRow - 1, currentColumn, pos + 1) || // Up
            dfs(currentRow, currentColumn + 1, pos + 1) || // Right
            dfs(currentRow, currentColumn - 1, pos + 1); // Left

        // Reseting position to next iterations
        board[currentRow][currentColumn] = word[pos];
        return found;
    };
    
    for (let currentRow = 0; currentRow < totalRows; currentRow++) {
        for (let currentColumn = 0; currentColumn < totalColumns; currentColumn++) {
            // If the first letter does not match with the path, we dont need to dfs it.
            if (board[currentRow][currentColumn] == word[0]) {
                const match = dfs(currentRow, currentColumn);
                if (match) {
                    return true;
                }
            }
        }
    }

    return false; 
};
