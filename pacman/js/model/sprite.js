/**
 * Represents the moving elements of the game like the pacman and ghosts.
 */
class Sprite extends Component {

    /**
     * To be created, a Sprite need the position , the direction and the id.
     * @param {Position} position the given position.
     * @param {Direction} direction the given direction.
     * @param {string} id the given id.
     */
    constructor(position, direction, id) {
        super(id);
        this._position = position;
        this._direction = direction;
        this._askedToChangeDirection = false;
        this._askedDirection = undefined;
        this._previousPosition = position;
        this._isDead = false;
        this._initialPosDir = [];
        this._initialPosDir.push(this._position);
        this._initialPosDir.push(this._direction);
    }

    /**
     * Simple getter of isDead.
     */
    get isDead() {
        return this._isDead;
    }

    /**
     * Simple getter of position.
     */
    get position() {
        return this._position;
    }

    /**
     * simple getter of direction.
     */
    get direction() {
        return this._direction;
    }
    /**
     * Allows to move the sprite to the next position.
     */
    move() {
        this._previousPosition = this._position;
        this._position = this._position.nextPosition(this._direction);
    }
    /**
     * Ask of changing sprite direction.
     * @param {Direction} direction 
     */
    askToChangeDirection(direction) {
        this._askedToChangeDirection = true;
        this._askedDirection = direction;
    }
    /**
     * Change the sprite Direction.
     */
    changeDirection() {
        this._direction = this._askedDirection;
        this._askedToChangeDirection = false;
        this._askedDirection = undefined;

    }

    /**
     * Notify Spririte when it is blocked.
     */
    notifyIsBlocked() { }
    /**
    * Declares the sprite dead.
    */
    hasBeenEaten() {
        this._isDead = true;
    }

    /**
    * Declares the prite alive.
    */
    respawn() {
        this._isDead = false;
        this._position = this._initialPosDir[0];
        this._direction = this._initialPosDir[1];
    }
}