"use strict";
const Command = require("../lib/VoiceBasedCommand");

class CPCapCommand extends Command {
    constructor(sosamba, ...args) {
        super(sosamba, ...args, {
            name: "cpcap",
        });
    }

    async run(ctx) {
        if (await this.canBeRun(ctx)) await Promise.all([
            this.playSound(ctx, "Pyro_autocappedcontrolpoint01.wav"),
            ctx.send("mmmmmph mmmph mmmmmmph!")
        ]);
    }
}

module.exports = CPCapCommand;