"use strict";
const Command = require("../lib/VoiceBasedCommand");

class HealThanksCommand extends Command {
    constructor(sosamba, ...args) {
        super(sosamba, ...args, {
            name: "healthanks"
        });
    }

    async run(ctx) {
        await Promise.all([
            this.playSound(ctx, "Pyro_thanksfortheheal01.wav"),
            ctx.send("mph!")
        ]);
    }
}

module.exports = HealThanksCommand;