"use strict";
const Command = require("../lib/VoiceBasedCommand");

class PositiveCommand extends Command {
    constructor(...args) {
        super(...args, {
            name: "pos"
        });
    }

    async run(ctx) {
        if (await this.canBeRun(ctx)) await Promise.all([
            this.playSound(ctx, "Pyro_positivevocalization01.wav"),
            ctx.send("mph, mph!")
        ]);
    }
}

module.exports = PositiveCommand;