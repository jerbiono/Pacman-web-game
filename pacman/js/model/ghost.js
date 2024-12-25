class Ghost extends Sprite {

    constructor(position, direction, id) {

        super(position, direction, id)
        
    }

    /**
     * allow to change the direction of incky ghost.
     * @param {Number} index the given indexDirection.
     */
    changeInckyDirection(indexDirection) {
       
        switch (indexDirection) {

            case 0: this._direction = Direction.NORTH;
                break;
            case 1: this._direction = Direction.EAST;
                break;
            case 2: this._direction = Direction.SOUTH;
                break;
            case 3: this._direction = Direction.WEST;
                break;
        }        
    }

    /**
     * Allows to get a new random direction.
     */
    _choiceNewDirection() {

        let randomNumber = parseInt((Math.random() * 20) + 1);
        switch (randomNumber) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                this._direction = Direction.EAST;
                break;
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
                this._direction = Direction.SOUTH;
                break;
            case 11:
            case 12:
            case 13:
            case 14:
            case 15:
                this._direction = Direction.NORTH;
                break;
            case 16:
            case 17:
            case 18:
            case 19:
            case 20: this._direction = Direction.WEST;
                break;
        }


    }
    /**
     * Checks if the ghost can eat the pacman.
     * @param {Pacman} pacman the given pacman
     * @returns true, otherwise return false.
     */
    canEat(pacman) {
        if (this._position.isEqualTo(pacman._position) || (this._position.isEqualTo(pacman._previousPosition) && this._previousPosition.isEqualTo(pacman._position))) {
            return true;
        }
        return false;
    }
    /**
     * Allows to notify the ghost to change it's direction.
     */
    notifyIsBlocked() {
        setTimeout(() => {
            this._choiceNewDirection();
        }, GHOST_MOVE_INTERVAL);
    }

}
