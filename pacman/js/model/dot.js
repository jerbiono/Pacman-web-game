/**
 * A dot is a fixed Pacman maze component.
 */
class Dot extends Tile {

     /**
     * To be created, a Dot just need an id.
     * @param {string} id unique dot's id
     */
    constructor(id) {
        super(id);
        this._isEnergizer = false;
    }

    /**
     * @returns {boolean}
     */
    get isEnergizer() {
        return this._isEnergizer;
    }
    
    /**
     * Changes the status of energizer
     */
    revertIsEnergizer(){
        this._isEnergizer = true;
    }
}