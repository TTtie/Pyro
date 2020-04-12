"use strict";
const Command = require("../lib/VoiceBasedCommand");

class GoodJobCommand extends Command {
    constructor(...args) {
        super(...args, {
            name: "goodjob"
        });
    }

    async run(ctx) {
        await Promise.all([
            this.playSound(ctx, "Pyro_goodjob01.wav"),
            ctx.send("*mmph mmmmph mph mph!*")
        ]);
    }
}

module.exports = GoodJobCommand;