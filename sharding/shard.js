const pp = require("process-as-promised");
const cluster = require("cluster");
class Shard {
    /**Represents a shard.
     * @prop {Number} id Shard ID
     * @prop {cluster.Worker} worker The worker
     * @prop {process} process The worker process
     * @prop {pp} IPC The IPC
     * @prop {Sharder} sharder The sharder
     */
    constructor(sharder, proc, worker, id) {
        this.id = id;
        this.worker = worker;
        this.process = proc || worker.process;
        this.process.setMaxListeners(0);
        this.IPC = new pp(this.process);
        this.sharder = sharder;
		this.sharder.IPC.onEvents.forEach((callback, event) => {
			this.IPC.on(event, callback);
		});
		this.sharder.IPC.onceEvents.forEach((event, callback) => this.IPC.once(event, callback));
    }

    /**Send a message to the worker process
     * @argument {any[]} args The parameters to pass to this.IPC.send
     */
    send(...args) {
        return this.IPC.send(...args);
    }
}

module.exports = Shard;