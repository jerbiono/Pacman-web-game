/**
 * A layer is the container of the differents tiles used to make differents levels.
 */
class Layer {

    /**
     * To be created, a Layer need the number of rows and the number of columns.
     * @param {number} nbRows 
     * @param {number} nbColumns 
     */
    constructor(nbRows, nbColumns) {
        this._nbRows = nbRows;
        this._nbColumns = nbColumns;
        this._layer = Array(nbRows).fill().map(() => Array(nbColumns));
    }
    /**
     * Checks if the given position belongs to the layer .
     * @param {Position} pos the given position.
     * @returns true, otherwise return false.
     */
    contains(pos) {

        if (pos.row < this._nbRows && pos.row >= 0 && pos.column < this._nbColumns && pos.column >= 0) {
            return true;
        } else {
            return false;
        }
    }
    /**
     * Set the given tile in the given position of the layer.
     * @param {Position} pos the given position.
     * @param {Tile} tile the given tile.
     */
    setTile(pos, tile) {
        if (!this.contains(pos)) {
            throw new RangeError('the given position is not valid !');
        }
        this._layer[pos.row][pos.column] = tile;

    }

    /**
     * Simple getter of the tile.
     * @param {Position} pos the given position.
     * @returns the tile at the given position.
     */
    getTile(pos) {
        if (!this.contains(pos)) {
            throw new RangeError('the given position is not valid !');
        }
        return this._layer[pos.row][pos.column];
    }
/**
 * Checks the existence of a tile at the given position.
 * @param {Position} pos the given position.
 * @returns true, otherwise return false.
 */
    hasTile(pos){
        if (!this.contains(pos)) {
            throw new RangeError('the given position is not valid !');
        }
       if(this._layer[pos.row][pos.column] == undefined) {
        return false;
       }
       return true;
    }
}