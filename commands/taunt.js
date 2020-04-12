"use strict";
const Command = require("../lib/VoiceBasedCommand");
const VoiceLineParser = require("../lib/VoiceLineParser");

class TauntCommand extends Command {
    constructor(sosamba, ...args) {
        super(sosamba, ...args, {
            name: "taunt",
            args: "[1-4]",
            argParser: new VoiceLineParser(sosamba, {
                voiceLineName: "Pyro_taunts0{{LINE_ID}}.wav"
            })
        });
    }

    async run(ctx, voiceFile) {
        await Promise.all([
            this.playSound(ctx, voiceFile),
            ctx.send("*mmmmph*")
        ]);
    }
}

module.exports = TauntCommand;