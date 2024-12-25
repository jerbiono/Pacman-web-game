/**
 * A Component represents tiles like wall and dots and also sprites like pacman.
 */
class Component {

    /**
   * To be created, a Component just need an id.
   *
   * @param {string} id unique tile's id
   */
    constructor(id) {
        this._id = id;
    }

    /**
     * @returns {string} 
     */
    get id() {
        return this._id;
    }
}