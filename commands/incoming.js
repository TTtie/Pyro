"use strict";
const Command = require("../lib/VoiceBasedCommand");

class IncomingCommand extends Command {
    constructor(...args) {
        super(...args, {
            name: "incoming"
        });
    }

    async run(ctx) {
        if (await this.canBeRun(ctx)) await Promise.all([
            this.playSound(ctx, "Pyro_sentryahead01.wav"),
            ctx.send("mmmmph mmmph!!!")
        ]);
    }
}

module.exports = IncomingCommand;