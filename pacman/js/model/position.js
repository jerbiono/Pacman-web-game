
/**
 * A Position indicate the row and the column of the tile or the sprite.
 */
class Position {

    /**
     * To be created, a Position need the row and the column.
     * @param {number} row the given row.
     * @param {number} column the given column.
     */
    constructor(row, column) {
        this._row = row;
        this._column = column;
    }

    /**
     * @returns {number}
     */
    get row() {
        return this._row;
    }
    /**
  * @returns {number}
  */
    get column() {
        return this._column;
    }
    /**
     * Allows to give the next position using the given direction.
     * @param {Direction} dir the given Direction.
     * @returns the new position.
     */
    nextPosition(dir) {
        return new Position(this._row + dir.deltaRow, this._column + dir.deltaColumn);
    }

    /**
     * Checks if positions are equals.
     * @param {Position} position 
     * @returns true if the positions are same, otherwise return false.
     */
    isEqualTo(position) {
        if (this._row == position.row && this.column == position.column) {
            return true;
        }
        return false;
    }
}