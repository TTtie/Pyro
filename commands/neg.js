"use strict";
const Command = require("../lib/VoiceBasedCommand");

class NegativeCommand extends Command {
    constructor(...args) {
        super(...args, {
            name: "neg"
        });
    }

    async run(ctx) {
        if (await this.canBeRun(ctx)) await Promise.all([
            this.playSound(ctx, "Pyro_negativevocalization01.wav"),
            ctx.send("mph mph.")
        ]);
    }
}

module.exports = NegativeCommand;