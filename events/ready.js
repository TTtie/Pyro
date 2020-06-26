"use strict";
const { Event, Logger } = require("sosamba");
const { workerData: { SHARD_ID } } = require("worker_threads");
const { prefix } = require("../config.json");

class ReadyEvent extends Event {
    constructor(...args) {
        super(...args, {
            name: "ready"
        });
        this.posterLog = new Logger({
            level: this.sosamba.options.log && this.sosamba.options.log.level ?
                this.sosamba.options.log.level : undefined,
            name: "DBLPoster"
        });
        this._rdy = false;
    }

    async run() {
        if (!this._rdy) {
            await this.sosamba.IPC.send("ready", {
                id: SHARD_ID,
                guilds: this.sosamba.guilds.size
            });
            this._rdy = true;
        }
        this.sosamba.editStatus("online", {
            name: `Type ${prefix}help | Shard ${SHARD_ID}`,
            type: 0
        });
    }
}
module.exports = ReadyEvent;