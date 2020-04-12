"use strict";
const { Command } = require("sosamba");
class DieCommand extends Command {
    constructor(...args) {
        super(...args, {
            name: "exit",
            description: "Shuts Pyro down."
        });
    }

    prerequisites(ctx) {
        return ctx.author.id === "150628341316059136";
    }

    async run(ctx) {
        await ctx.send(":wave:");
        this.sosamba.IPC.send("die");
    }
}

module.exports = DieCommand;