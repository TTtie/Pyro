"use strict";
const Command = require("../lib/VoiceBasedCommand");

class HeadRightCommand extends Command {
    constructor(...args) {
        super(...args, {
            name: "headright"
        });
    }

    async run(ctx) {
        await Promise.all([
            this.playSound(ctx, "Pyro_headright01.wav"),
            ctx.send("*MMPH MMMPH!*")
        ]);
    }
}

module.exports = HeadRightCommand;