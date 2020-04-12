"use strict";
const Command = require("../lib/VoiceBasedCommand");

class StayOnPointCommand extends Command {
    constructor(...args) {
        super(...args, {
            name: "point"
        });
    }

    async run(ctx) {
        await Promise.all([
            this.playSound(ctx, "Pyro_standonthepoint01.wav"),
            ctx.send("*MMPH MM MPH MMMPH MPH!!!!*")
        ]);
    }
}

module.exports = StayOnPointCommand;