"use strict";
const Command = require("../lib/VoiceBasedCommand");

class HappyLaughCommand extends Command {
    constructor(sosamba, ...args) {
        super(sosamba, ...args, {
            name: "happylaugh"
        });
    }

    async run(ctx) {
        if (await this.canBeRun(ctx)) await Promise.all([
            this.playSound(ctx, "Pyro_laughhappy01.wav"),
            ctx.send("mph!")
        ]);
    }
}

module.exports = HappyLaughCommand;