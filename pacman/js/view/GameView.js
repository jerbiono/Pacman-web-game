/**
 * A GameView allows to centralize the display of each component of our game; the tiles, Pacman and the ghosts.
 */
class GameView {

    /**
     * To be created, a GameView need a Game which represent the facade of the whole game.
     * @param {Game} Game the given game
     */
    constructor(Game) {
        let component, type, currentPosition;
        this._game = Game;
        this._heighScore = Game._heighScore;
        this._dotToRemove;
        let isGhostSprite = false;
        this._maze = Game.maze;
        this._pacman = Game.pacman;
        this._blincky = Game.blincky;
        this._pincky = Game.pinky;
        this._inky = Game.inky;
        this._clyde = Game.clyde;
        this._nbLives = this._pacman.nbLives;
        this._isLivesUpdated = false;
        for (let i = 0; i < this._maze.nbRows; i++) {
            for (let j = 0; j < this._maze.nbColumns; j++) {
                currentPosition = new Position(i, j);
                if (this._maze._walls.hasTile(currentPosition)) {
                    component = this._maze.getWallLayerTile(currentPosition);
                    type = "wall";
                } else if (this._maze._dots.hasTile(currentPosition)) {
                    component = this._maze.getDotLayerTile(currentPosition);
                    type = "dot"
                } else if (this._maze._superDots.hasTile(currentPosition)) {
                    component = this._maze.getSuperDotsLayerTile(currentPosition);
                    type = "superDot"
                } else if (this._pacman.position.isEqualTo(currentPosition)) {
                    component = this._pacman;
                    type += PACMAN_ID;
                }
                if (this._blincky.position.isEqualTo(currentPosition)) {
                    component = this._blincky;
                    type += " " + BLINCKY_ID;
                    isGhostSprite = true;
                }
                if (this._pincky.position.isEqualTo(currentPosition)) {
                    component = this._pincky
                    type += " " + PINCKY_ID;
                    isGhostSprite = true;
                }
                if (this._inky.position.isEqualTo(currentPosition)) {
                    component = this._inky;
                    type += " " + INKY_ID;
                    isGhostSprite = true;
                }
                if (this._clyde.position.isEqualTo(currentPosition)) {
                    component = this._clyde;
                    type += " " + CLYDE_ID;
                    isGhostSprite = true;
                }

                if (type == PACMAN_ID) {
                    this.displayPacman(component, i, j);
                } else if (type == "wall" || type == "dot" || type == "superDot") {

                    this.displayMaze(component, type, i, j);
                } else if (isGhostSprite) {
                    this.displayGhost(component, type, i, j);
                }
                component = "";
                type = "";
                isGhostSprite = false;
            }
        }
    }

    /**
     * Allows to display the different tiles on the maze.
     * @param {Tile} element the given tile.
     * @param {string} type the given ghost id.
     * @param {number} rowIndex the given row index.
     * @param {number} columnIndex the given column index.
     */
    displayMaze(element, type, rowIndex, columnIndex) {
        $('#boardContent').append(`<div class="elem ${type}" id="${element.id}"> </div>`);
        $(`#${element.id}`).css('top', (TILESIZE * rowIndex) + "px");
        $(`#${element.id}`).css('left', (TILESIZE * columnIndex) + "px");
    }

    /**
     * Allows to display the different ghosts on the maze.
     * @param {Ghost} element the given ghost.
     * @param {number} rowIndex the given row index.
     * @param {number} columnIndex the given column index.
     */
    displayGhost(element, type, rowIndex, columnIndex) {
        $('#boardContent').append(`<div class="elem ghost ${type}" id="${element.id}${rowIndex}-${columnIndex}"> 
        <div class="ghost__firstEye"></div>
        <div class="ghost__secondEye"></div>
        <div class="ghost__mouth"></div>
      </div>`);
        $(`#${element.id}${rowIndex}-${columnIndex}`).css('top', (TILESIZE * rowIndex) + "px");
        $(`#${element.id}${rowIndex}-${columnIndex}`).css('left', (TILESIZE * columnIndex) + "px");
    }

    /**
    * Allows to display the position of pacman on the maze.
    * @param {Pacman} element the given sprite
    * @param {number} rowIndex the given row index.
    * @param {number} columnIndex the given column index.
    */
    displayPacman(element, rowIndex, columnIndex) {
        let directionClass = '';
        switch (element.direction) {
            case Direction.EAST:
                directionClass = 'EAST';
                break;

            case Direction.WEST:
                directionClass = 'WEST';
                break;

            case Direction.SOUTH:
                directionClass = 'SOUTH';
                break;

            case Direction.NORTH:
                directionClass = 'NORTH';
                break;
        }

        $('#boardContent').append(
            `<div class="elem ${element.id} ${element.id}${rowIndex}-${columnIndex} ${directionClass}"  >
        <div class="pacman__eye"></div>
        <div class="pacman__mouth"></div>
      </div>`);
        $(`.${element.id}${rowIndex}-${columnIndex}`).css('top', (TILESIZE * rowIndex) + "px");
        $(`.${element.id}${rowIndex}-${columnIndex}`).css('left', (TILESIZE * columnIndex) + "px");

    }

    /**
     * Allows to remove the different sprites.
     */
    removeSprites() {
        $(`.${this._pacman.id}`).remove();
        $(`.${this._blincky.id}`).remove();
        $(`.${this._pincky.id}`).remove();
        $(`.${this._inky.id}`).remove();
        $(`.${this._clyde.id}`).remove();
    }
    /**
     * Allows to display the different sprites.
     */
    displaySprites() {
        if (this._pacman._nblives > 0 && this._game._nbDots > 0) {
            this.displayPacman(this._pacman, this._pacman.position.row, this._pacman.position.column);
        }
        this.displayGhost(this._blincky, this._blincky.id, this._blincky.position.row, this._blincky.position.column);
        this.displayGhost(this._pincky, this._pincky.id, this._pincky.position.row, this._pincky.position.column);
        this.displayGhost(this._inky, this._inky.id, this._inky.position.row, this._inky.position.column);
        this.displayGhost(this._clyde, this._clyde.id, this._clyde.position.row, this._clyde.position.column);
    }

    /**
     * Allows to update pacman lives.
     */
    updateLives() {
        if (this._nbLives >= this._pacman._nblives) {
            this._nbLives--
            this._isLivesUpdated = true;
            $(`#nbLives`).remove();
        }

        if (this._isLivesUpdated) {
            $(`#statusContent`).html(`<div id="nbLives"></div>`)
            for (let index = 0; index <= this._nbLives; index++) {
                $(`#nbLives`).append(`<i class="fa fa-heart" aria-hidden="true"></i>`);
            }
            this._isLivesUpdated = false;
        }
    }
    /**
     * Allows to update the score.
     */
    updateScore() {
        $(`#currentScore`).text(this._game._score);
        if (this._heighScore == null) {
            this._heighScore = 0;
        }
        $(`#heightScore`).text(this._heighScore);

    }

    /**
     * Update the display of different dots.
     */
    updateDots() {
        this._dotToRemove = this._game._removedDot;
        $(`#${this._dotToRemove.id}`).remove();
    }

    /**
     * Allows to update the status of sprites.
     */
    updateSprites() {
        this.removeSprites();
        this.displaySprites();
    }

    /**
     * Updates the pacman position on the maze.
     */
    updateFrame() {
        this.updateSprites();
        this.updateScore();
        this.updateDots();
    }
    /**
     * Display the heigh score when the game is over.
     */
    displayGameOver() {
        $(`#heightScore`).text(this._heighScore);
    }


}