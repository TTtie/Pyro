"use strict";
const Command = require("../lib/VoiceBasedCommand");
const VoiceLineParser = require("../lib/VoiceLineParser");

class SpellCommand extends Command {
    constructor(sosamba, ...args) {
        super(sosamba, ...args, {
            name: "spell",
            args: "[1-9]",
            argParser: new VoiceLineParser(sosamba, {
                voiceLineName: "Pyro_sf13_spell_generic0{{LINE_ID}}.wav"
            })
        });
    }

    async run(ctx, voiceFile) {
        await Promise.all([
            this.playSound(ctx, voiceFile),
            ctx.send("*mmmmmph mmmph*")
        ]);
    }
}

module.exports = SpellCommand;