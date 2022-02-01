"use strict";
const Command = require("../lib/VoiceBasedCommand");

class CallForDefendHelpCommand extends Command {
    constructor(sosamba, ...args) {
        super(sosamba, ...args, {
            name: "helpmedef"
        });
    }

    async run(ctx) {
        if (await this.canBeRun(ctx)) await Promise.all([
            this.playSound(ctx, "Pyro_helpmedefend01.wav"),
            ctx.send("*MMPH MPH MMMMPH!*")
        ]);
    }
}

module.exports = CallForDefendHelpCommand;