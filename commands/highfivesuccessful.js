"use strict";
const Command = require("../lib/VoiceBasedCommand");
const VoiceLineParser = require("../lib/VoiceLineParser");

class HighFiveSuccessfulCommand extends Command {
    constructor(sosamba, ...args) {
        super(sosamba, ...args, {
            name: "highfivesuccessful",
            args: "[1-3]",
            aliases: ["high5successful", "high5+"],
            argParser: new VoiceLineParser(sosamba, {
                voiceLineName: "Pyro_highfive_success0{{LINE_ID}}.wav"
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

module.exports = HighFiveSuccessfulCommand;