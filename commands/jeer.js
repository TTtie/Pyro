"use strict";
const Command = require("../lib/VoiceBasedCommand");
const VoiceLineParser = require("../lib/VoiceLineParser");

class JeerCommand extends Command {
    constructor(sosamba, ...args) {
        super(sosamba, ...args, {
            name: "jeer",
            args: "[1-2]",
            argParser: new VoiceLineParser(sosamba, {
                voiceLineName: "Pyro_jeers0{{LINE_ID}}.wav"
            })
        });
    }

    async run(ctx, voiceFile) {
        await Promise.all([
            this.playSound(ctx, voiceFile),
            ctx.send("*mmmph*")
        ]);
    }
}

module.exports = JeerCommand;