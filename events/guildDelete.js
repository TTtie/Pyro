"use strict";
const { Event } = require("sosamba");
const { workerData: { SHARD_ID }} = require("worker_threads");
class GuildLeaveEvent extends Event {
    constructor(...args) {
        super(...args, {
            name: "guildDelete"
        });
    }
    async run() {
        await this.sosamba.IPC.send("sendGuilds", {
            id: SHARD_ID,
            guilds: this.sosamba.guilds.size
        });
    }
}
module.exports = GuildLeaveEvent;