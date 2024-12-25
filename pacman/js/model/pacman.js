/**
 * The powerful, the pleasurable, the indestructible Pacman.
 */
class Pacman extends Sprite {
    /**
     *@param {Position} position the initial position
     *@param {Direction} direction the initial direction
     */
    constructor(position, direction) {
        super(position, direction, PACMAN_ID);
        this._nblives = NB_LIVES;
    }
    /**
     * Simple getter of nbLives.
     */
    get nbLives() {
        return this._nblives;
    }
    /**
     * Declares that pacman loses a live.
     */
    hasBeenEaten() {
      super.hasBeenEaten();
        this._nblives--;
    }
}