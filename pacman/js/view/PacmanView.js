/**
 * Allows to link the movement of pacman according to direction choiced by the user.
 */
class PacmanView {
/**
 * To be created a PacmanView just need a pacman controller.
 * @param {PacmanCtrl} pacmanCtrl 
 */
    constructor(pacmanCtrl) {
        this._pacmanCtrl = pacmanCtrl;
        this.getEventKeyListener(this._pacmanCtrl);
    }
    
/**
 * Simple getter of key event.
 * @param {PacmanCtrl} pacManController the given controller of pacman.
 */
    getEventKeyListener(pacManController) {
        $(document).on("keydown", function (event) {
            switch (event.code) {
                case "ArrowLeft":
                    pacManController.askToChangeDirection(Direction.WEST);
                    break;
                case "ArrowUp":
                    pacManController.askToChangeDirection(Direction.NORTH);
                    break;
                case "ArrowRight":
                    pacManController.askToChangeDirection(Direction.EAST);
                    break;
                case "ArrowDown":
                    pacManController.askToChangeDirection(Direction.SOUTH);
                    break;
            }
        });
    } 
}

