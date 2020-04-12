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
    }

    async run() {
        this.sosamba.IPC.send("ready", {
            id: SHARD_ID,
            guilds: this.sosamba.guilds.size
        });

        await this.postToDBots();
        setInterval(() => this.postToDBots(), 1800000);

        this.sosamba.editStatus("online", {
            name: `Type ${prefix}help | Shard ${SHARD_ID}`,
            type: 0
        });
    }

    async postToDBots() {
        const success = await this.sosamba.IPC.send("sendGuilds", {
            id: SHARD_ID,
            guilds: this.sosamba.guilds.size
        });

        if (success) {
            this.posterLog.info("Successfully posted to DBots.");
        } else {
            this.posterLog.warn("Posting to DBots has resulted in an error.");
        }
    }
}
module.exports = ReadyEvent;