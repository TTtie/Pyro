class EventMapper {
    /**
     * Constructs the sharder IPC
     * @prop {Sharder} sharder The sharder
     * @prop {Map<string, Function>} onEvents on events
     * @prop {Map<string, Function>} onceEvents once events
     */
    constructor(sharder) {
        this.sharder = sharder;
        this.onEvents = new Map();
        this.onceEvents = new Map();
    }

    /**
     * On event setter
     * @param {string} evt 
     * @param {Function} cback 
     * @returns {EventMapper}
     */
    on(evt, cback) {
        this.onEvents.set(evt, cback);
        return this;
    }

    /**
     * Once event setter
     * @param {string} evt 
     * @param {Function} cback 
     * @returns {EventMapper}
     */
    on(evt, cback) {
        this.onEvents.set(evt, cback);
        return this;
    }
}
module.exports = EventMapper;