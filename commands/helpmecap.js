"use strict";
const Command = require("../lib/VoiceBasedCommand");

class CallForCaptureHelpCommand extends Command {
    constructor(sosamba, ...args) {
        super(sosamba, ...args, {
            name: "helpmecap"
        });
    }

    async run(ctx) {
        if (await this.canBeRun(ctx)) await Promise.all([
            this.playSound(ctx, "Pyro_helpmecapture01.wav"),
            ctx.send("*MMPH MPH MMMMMPH!*")
        ]);
    }
}

module.exports = CallForCaptureHelpCommand;