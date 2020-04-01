const pp = require("workers-as-promised");
class Shard {
    /**
     * Represents a shard.
     * @prop {Number} id Shard ID
     * @prop {Worker} worker The worker
     * @prop {pp} IPC The IPC
     * @prop {Sharder} sharder The sharder
     */
    constructor(sharder, worker, id) {
        this.id = id;
        this.worker = worker;
        this.IPC = new pp(worker);
        this.sharder = sharder;
        this.sharder.IPC.onEvents.forEach((callback, event) => {
            this.IPC.on(event, callback);
        });
        this.sharder.IPC.onceEvents.forEach((event, callback) => this.IPC.once(event, callback));
    }

    /**
     * Send a message to the worker process
     * @argument {any[]} args The parameters to pass to this.IPC.send
     */
    send(...args) {
        return this.IPC.send(...args);
    }
}

module.exports = Shard;