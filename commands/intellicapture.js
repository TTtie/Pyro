"use strict";
const Command = require("../lib/VoiceBasedCommand");

class IntelligenceCaptureCommand extends Command {
    constructor(...args) {
        super(...args, {
            name: "intellicapture"
        });
    }

    async run(ctx) {
        await Promise.all([
            this.playSound(ctx, "Pyro_autocappedintelligence01.wav"),
            ctx.send("mmmmmmmmmmph mmmmmmph!")
        ]);
    }
}

module.exports = IntelligenceCaptureCommand;