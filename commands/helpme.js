"use strict";
const Command = require("../lib/VoiceBasedCommand");

class CallForHelpCommand extends Command {
    constructor(sosamba, ...args) {
        super(sosamba, ...args, {
            name: "helpme"
        });
    }

    async run(ctx) {
        await Promise.all([
            this.playSound(ctx, "Pyro_helpme01.wav"),
            ctx.send("*MMPH MPH!*")
        ]);
    }
}

module.exports = CallForHelpCommand;