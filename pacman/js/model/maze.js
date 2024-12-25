/**
 * A Maze represents the different walls and dots.
 */
class Maze {

    /**
     *  To be created, a Maze need an object maze which contain the array of the differents element of the maze.
     * @param {object} Raw_Maze the given raw maze.
     */
    constructor(Raw_Maze) {

        let mazeTable, currentPosition;
        mazeTable = Raw_Maze.table;
        this._nbRows = mazeTable.length;
        this._nbColumns = mazeTable[0].length;
        this._walls = new Layer(this._nbRows, this._nbColumns);
        this._dots = new Layer(this._nbRows, this._nbColumns);
        this._superDots = new Layer(this._nbRows, this._nbColumns);
        this._pacManPosition;
        this._nbDots = 0;
        for (let i = 0; i < mazeTable.length; i++) {
            for (let j = 0; j < mazeTable[i].length; j++) {
                currentPosition = new Position(i, j);
                this.fillLayers(mazeTable[i][j], currentPosition, i, j);
            }
        }

    }
    /**
     * Fill the different layer according to the element value and it's position.
     * @param {number} elementValue the value of the element on the maze table.
     * @param {Position} position the current position of element.
     * @param {number} rowIndex the given row index.
     * @param {number} columnIndex the given column index.
     */
    fillLayers(elementValue, position, rowIndex, columnIndex) {
        switch (elementValue) {
            case 1:
                this._walls.setTile(position, new Wall(`${rowIndex + "-" + columnIndex}`));
                break;
            case 2:
                this._dots.setTile(position, new Dot(`${rowIndex + "-" + columnIndex}`));
                this._nbDots++;
                break;
            case 3:
                this._superDots.setTile(position, new Dot(`${rowIndex + "-" + columnIndex}`));
                this._nbDots++;
                break;
            case 4:
                this._pacManPosition = new Position(rowIndex, columnIndex);
                break;
            case 5:
                this._ghostPosition = new Position(rowIndex, columnIndex);
                break;

        }

    }

    /**
     * Simple getter of ghosts original positions.
     */
    get ghostPosition() {
        return this._ghostPosition;
    }

    /**
     * Simple getter of pacman position.
     */
    get pacManPosition() {
        return this._pacManPosition;
    }

    /**
        * Checks if the pac man can change it's position in the maze of the game.
        * @param {Position} position the given position.
        * @returns return true, otherwise return false.
        */
    canWalkOn(position) {
        if (this._walls.contains(position) && !this._walls.hasTile(position)) {
            return true;
        }
        return false;
    }
    /**
     * Checks if the pac man can pick a dot in the maze of the game.
     * @param {Position} position the given position.
     * @returns true otherwise return false.
     */
    canPick(position) {
        if (this._dots.hasTile(position) || this._superDots.hasTile(position)) {
            return true;
        }
        return false;
    }
    /**
     * Allows to pick a dot or a super dot tile.
     * @param {Position} position the given position.
     * @returns dot or super dot tile , otherwise throw error.
     */
    pick(position) {
        let eatenTile;
        if (this._dots.hasTile(position)) {
            eatenTile = this._dots.getTile(position);
            this._dots.setTile(position, undefined);
            this._nbDots--;
            return eatenTile;
        }

        if (this._superDots.hasTile(position)) {
            eatenTile = this._superDots.getTile(position);
            eatenTile.revertIsEnergizer();
            this._superDots.setTile(position, undefined);
            this._nbDots--;
            return eatenTile;
        }

        throw new RangeError('the given position is not valid does not contain a dot tile !');

    }

    /**
     * Checks the existance of dots on the maze.
     * @returns true if the numbers of dots equal to zero , otherwise return false.
     */
    isEmpty() {
        return this._nbDots == 0 ? true : false;
    }


    /**
     * Simple getter of a wall layer tile.
     * @param {Position} pos the given position.
     * @returns the wall tile at the given position.
     */
    getWallLayerTile(pos) {
        if (this._walls.contains(pos)) {
            return this._walls.getTile(pos);
        }

    }

    /**
     * Simple getter of a dot layer tile.
     * @param {Position} pos the given position.
     * @returns the dot tile at the given position.
     */
    getDotLayerTile(pos) {
        if (this._dots.contains(pos)) {
            return this._dots.getTile(pos);
        }

    }

    /**
     * Simple getter of a super dot layer tile.
     * @param {Position} pos the given position.
     * @returns the super dot tile at the given position.
     */
    getSuperDotsLayerTile(pos) {
        if (this._superDots.contains(pos)) {
            return this._superDots.getTile(pos);
        }
    }

    /**
     * Simple getter of number of rows.
     */
    get nbRows() {
        return this._nbRows;
    }

    /**
     * Simple getter of number of columns
     */
    get nbColumns() {
        return this._nbColumns;
    }
}


