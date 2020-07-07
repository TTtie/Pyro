"use strict";
const { Event } = require("sosamba");
const { workerData: { SHARD_ID } } = require("worker_threads");
class GuildJoinEvent extends Event {
    constructor(...args) {
        super(...args, {
            name: "guildCreate"
        });
    }

    async run() {
        await this.sosamba.IPC.send("sendGuilds", {
            id: SHARD_ID,
            guilds: this.sosamba.guilds.size
        });
    }
}
module.exports = GuildJoinEvent;
