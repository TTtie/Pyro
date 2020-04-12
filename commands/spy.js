"use strict";
const Command = require("../lib/VoiceBasedCommand");

class SpyCommand extends Command {
    constructor(...args) {
        super(...args, {
            name: "spy"
        });
    }

    async run(ctx) {
        await Promise.all([
            this.playSound(ctx, "Pyro_cloakedspy01.wav"),
            ctx.send("*mmph mmmmph mph mph!*")
        ]);
    }
}

module.exports = SpyCommand;