/**
 * Allows to create the maze with different fixed components.
 */
class GameCtrl {

    /**
     * To be created, a Game controller just need an maze.
     * @param {maze} Raw_Maze the given maze.
     */
    constructor(Raw_Maze) {
        this._game = new Game(Raw_Maze);
        this._view = new GameView(this._game);
        this._pacmanCtrl = new PacmanCtrl(this._game.pacman);
        this._pacmanView = new PacmanView(this._pacmanCtrl);
        this.switchPauseStatus(this._game);

    }

    /**
     * Allows to switch from pause to
     * @param {Game} game the given Game.
     * @returns 
     */
    switchPauseStatus(game) {
        $(document).on("keydown", function (event) {
            switch (event.code) {
                case "KeyP":
                    game.changeStatus();
                    break;

            }
        });
    }

    /**
     * Allows to move the pacman and update it's position on the maze.
     */
    run() {
        this._timer = setInterval(() => {
            if (!this._game.isGameOver()) {
                this._game.moveSprites();
                this._view.updateFrame();
                this._view.updateLives();

            } else {
                this._game.respawn();
                this._game.saveScore();
                this._view.displayGameOver();
                clearInterval(this._timer);
            }


        }, RUN_INTERVAL);


    }




}