/**
 * Indicates to the sprites the different directions to do the move.
 */
class Direction {



    /**
     * To be created, a Direction need a deltaRow and deltaColumn .
     * @param {number} deltaRow the given vertical axe , it can be 1(south direction) or -1 (north direction)
     * @param {number} deltaColumn the given horizontal axe , it can be 1(east direction) or -1 (west direction)
     */
    constructor(deltaRow, deltaColumn) {
        this._row = deltaRow;
        this._column = deltaColumn;
    }

    /**
     * Simple getter of deltaRow.
     */
    get deltaRow() {
        return this._row;
    }

    /**
     * Simple getter of deltaColumn.
     */
    get deltaColumn() {
        return this._column;
    }
    static WEST = new Direction(0, -1);
    static NORTH = new Direction(-1, 0);
    static SOUTH = new Direction(1, 0);
    static EAST = new Direction(0, 1);
    
}