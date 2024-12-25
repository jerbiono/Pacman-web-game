/**
 * A Game represent the facade of all the game and it contain the maze.
 */
class Game {

    /**
     * To be created, a Game need an object maze which contain the array of the differents element of the maze.
     * @param {object} Raw_Maze 
     */
    constructor(Raw_Maze) {
        this._maze = new Maze(Raw_Maze);
        this._pacman = new Pacman(this._maze.pacManPosition, Direction.WEST);
        this._blincky = new Ghost(this._maze.ghostPosition, Direction.EAST, BLINCKY_ID);
        this._pinky = new Ghost(this._maze.ghostPosition, Direction.WEST, PINCKY_ID);
        this._inky = new Ghost(this._maze.ghostPosition, Direction.NORTH, INKY_ID);
        this._clyde = new Ghost(this._maze.ghostPosition, Direction.SOUTH, CLYDE_ID);
        this._score = 0;
        this._heighScore = localStorage.getItem("heighScore");
        this._removedDot;
        this._nbDots;
        this._status = 1;
        this._indexDirection = 0;
    }



    /**
     * Simple getter of heigh score.
     */
    get heighScore() {
        return this._heighScore;
    }

    /**
     * Allows to save the height score.
     */
    saveScore() {
        if (this._heighScore <= this._score) {
            this._heighScore = this._score;
            console.log(this._heighScore);
            localStorage.setItem("heighScore", this._heighScore);
        }
    }
    /**
    * Simple getter of score.
    */
    get score() {
        return this._score;
    }

    get nbDots() {
        return this._nbDots;
    }

    /**
     * Simple getter of last dot to be removed from the maze.
     */
    get removedDot() {
        return this._removedDot;
    }

    /**
     * Simpe getter of the blincky.
     */
    get blincky() {
        return this._blincky;
    }

    /**
    * Simpe getter of the pinky.
    */
    get pinky() {
        return this._pinky;
    }

    /**
    * Simpe getter of the inky.
    */
    get inky() {
        return this._inky;
    }

    /**
    * Simpe getter of the clyde.
    */

    get clyde() {
        return this._clyde;
    }

    /**
     * Simpe getter of the maze.
     */
    get maze() {
        return this._maze;
    }
    /**
     * Simple getter of the pacman.
     */
    get pacman() {
        return this._pacman;
    }

    /**
     * Allows to pause and continue the game.
     */
    changeStatus() {
        this._status *= -1;
    }

    /**
     * Allows to move the sprites on the maze(ghosts and pacman).
     */
    moveSprites() {

        if (this._status == 1) {
            this._nbDots = this._maze._nbDots;

            if (this._pacman._askedToChangeDirection) {
                this._pacman.changeDirection();
            }

            let pacmmanPositionToCheck = this._pacman.position.nextPosition(this._pacman.direction);
            let blinckyPositionToCheck = this._blincky.position.nextPosition(this._blincky.direction);
            let pinckyPositionToCheck = this._pinky.position.nextPosition(this._pinky.direction);
            let inckyPositionToCheck = this._inky.position.nextPosition(this._inky.direction);
            let clydePositionToCheck = this._clyde.position.nextPosition(this._clyde.direction);
          
            this.movePacman(this._pacman, pacmmanPositionToCheck);
            this.moveGhost(this._blincky, blinckyPositionToCheck);
            this.moveGhost(this._pinky, pinckyPositionToCheck);
            this.moveIncky(inckyPositionToCheck);

            this.moveGhost(this._clyde, clydePositionToCheck);

            if (this._blincky.canEat(this._pacman)) {
                this.eatPacman()
                this.respawn();

            }

            if (this._pinky.canEat(this._pacman)) {
                this.eatPacman()
                this.respawn();

            }

            if (this._inky.canEat(this._pacman)) {
                this.eatPacman()
                this.respawn();

            }

            if (this._clyde.canEat(this._pacman)) {
                this.eatPacman()
                this.respawn();

            }
        }
    }

    /**
     * Allows the move of the ghost.
     * @param {Ghost} ghostType the given ghost.
     * @param {position} position the given position.
     */
    moveGhost(ghostType, position) {
        if (!this.maze.canWalkOn(position)) {
            ghostType.notifyIsBlocked();
        } else {
            ghostType.move();
        }
    }


     /**
     * Allows the move of the ghost.
     * @param {position} position the given position.
     */
    moveIncky( position) {

        if (this.maze.canWalkOn(position)) {
            this._inky.move();
        }
        this._inky.changeInckyDirection(this._indexDirection);
            this._indexDirection += 1;
            this._indexDirection %= 4;

    }

    /**
     * Allows the move of the pacman.
     * @param {Pacman} pacman the given pacman.
     * @param {Position} position the given position.
     */
    movePacman(pacman, position) {

        if (this._maze.canWalkOn(position)) {
            pacman.move();
            if (this._maze.canPick(position)) {
                this._removedDot = this._maze.pick(position);
                if (!this._removedDot.isEnergizer) {
                    this._score += 10;
                } else {
                    this._score += 100;
                }

            }
        }
    }
    /**
     * Checks the numbers of lives of pacman if it is lower than 0.
     * @returns true, otherwise return false.
     */
    isGameOver() {
        return (this._pacman._nblives <= 0 ? true : false || this._nbDots == 0 ? true : false);
    }

    /**
     * Checks if the pacman is dead.
     * @returns true if he is dead , otherwise return false.
     */
    pacmanHasBeenEaten() {
        return this._pacman.isDead ? true : false;
    }
    /**
     * Allows to eat pacman.
     */
    eatPacman() {
        if (!this.pacmanHasBeenEaten()) {
            this._pacman.hasBeenEaten();
        }
    }

    /**
     * Repsman the different sprites.
     */
    respawn() {
        this._pacman.respawn();
        this._blincky.respawn();
        this._pinky.respawn();
        this._inky.respawn();
        this._clyde.respawn();

    }


}