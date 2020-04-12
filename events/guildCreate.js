const { Event, Logger } = require("sosamba");
const { workerData: { SHARD_ID } } = require("worker_threads");
const { prefix } = require("../config.json");

class GuildJoinEvent extends Event {
    constructor(...args) {
        super(...args, {
            name: "guildCreate"
        });
    }

    async prerequisites(guild) {
        return this.sosamba.listBotColls().includes(guild);
    }

    async run(guild) {
        guild.leave();
    }
}
module.exports = GuildJoinEvent;