"use strict";
const Command = require("../lib/VoiceBasedCommand");
const VoiceLineParser = require("../lib/VoiceLineParser");

class HighFiveCommand extends Command {
    constructor(sosamba, ...args) {
        super(sosamba, ...args, {
            name: "highfive",
            args: "[1-2]",
            aliases: ["high5"],
            argParser: new VoiceLineParser(sosamba, {
                voiceLineName: "Pyro_highfive0{{LINE_ID}}.wav"
            })
        });
    }

    async run(ctx, voiceFile) {
        await Promise.all([
            this.playSound(ctx, voiceFile),
            ctx.send("*mmph mmph mph!*")
        ]);
    }
}

module.exports = HighFiveCommand;