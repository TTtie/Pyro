"use strict";
const Command = require("../lib/VoiceBasedCommand");

class LongLaughCommand extends Command {
    constructor(...args) {
        super(...args, {
            name: "longlaugh"
        });
    }

    async run(ctx) {
        await Promise.all([
            this.playSound(ctx, "Pyro_laughlong01.wav"),
            ctx.send("mmmmmmmmmmph!!!!!")
        ]);
    }
}

module.exports = LongLaughCommand;