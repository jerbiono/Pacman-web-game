var board = RAW_MAZE.table;
/**
 * Allows to display the board of the game
 */
function displayBoard() {
    let element;
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            element = getElementToDisplay(board[i][j]);
            $('#boardContent').append(`<div class="elem ${element}" id= "${element}${i + "-" + j}"> </div>`);
            $(`#${element}${i + "-" + j}`).css('top', (tileSize * i) + "px");
            $(`#${element}${i + "-" + j}`).css('left', (tileSize * j) + "px");
            
        }
    }
}

/**
 * Simple getter of the element which will be displayed on the board.
 * @param {number} square the given value which refer to the element to display. 
 * @returns the element to display.
 */
function getElementToDisplay(square) {
    switch (square) {
        case 0:
            return;
        case 1:
            return "wall";   
        case 2:
            return "dot";
           
    }

}


