"use strict";
const { Command } = require("sosamba");
const { homeGuild } = require("../config.json");
class DieCommand extends Command {
    constructor(...args) {
        super(...args, {
            name: "exit",
            description: "Shuts Pyro down.",
            registerIn: homeGuild
        });
    }

    permissionCheck(ctx) {
        return ctx.author.id === "150628341316059136";
    }

    async run(ctx) {
        await ctx.send(":wave:");
        await this.sosamba.disconnect({
            reconnect: false
        });
    }
}

module.exports = DieCommand;