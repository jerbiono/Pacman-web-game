/**
 * Allows to create the pacman component.
 */
class PacmanCtrl {

    /**
     * To be created, a Pacman controller just need an pacman.
     * @param {Pacman} pacMan the given pacMan.
     */
    constructor(pacMan) {
        this._pacMan = pacMan;
    }
    /**
     * Allows to ask Direction.
     * @param {Direction} direction 
     */
    askToChangeDirection(direction) {
        this._pacMan.askToChangeDirection(direction);
    }
}