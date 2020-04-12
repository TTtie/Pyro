"use strict";
const Command = require("../lib/VoiceBasedCommand");
const VoiceLineParser = require("../lib/VoiceLineParser");

class CritKillCommand extends Command {
    constructor(sosamba, ...args) {
        super(sosamba, ...args, {
            name: "critkill",
            args: "[1-3]",
            argParser: new VoiceLineParser(sosamba, {
                voiceLineName: "Pyro_paincrticialdeath0{{LINE_ID}}.wav"
            })
        });
    }

    async run(ctx, voiceFile) {
        await Promise.all([
            this.playSound(ctx, voiceFile),
            ctx.send("*mmph*")
        ]);
    }
}

module.exports = CritKillCommand;