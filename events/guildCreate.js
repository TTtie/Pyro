"use strict";
const { Event } = require("sosamba");
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