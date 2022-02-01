"use strict";
const Command = require("../lib/VoiceBasedCommand");

class SpecialCompletedWithAssistanceCommand extends Command {
    constructor(...args) {
        super(...args, {
            name: "specialassist"
        });
    }

    async run(ctx) {
        if (await this.canBeRun(ctx)) await Promise.all([
            this.playSound(ctx, "Pyro_specialcompleted-assistedkill01.wav"),
            ctx.send("*mmmmmph*")
        ]);
    }
}

module.exports = SpecialCompletedWithAssistanceCommand;