"use strict";
const Command = require("../lib/VoiceBasedCommand");
const { BaseVoiceLineStruct, makeChoices } = require("../lib/utils");

class HighFiveCommand extends Command {
    constructor(sosamba, ...args) {
        super(sosamba, ...args, {
            name: "highfive",
            args: [
                {
                    ...BaseVoiceLineStruct,
                    choices: makeChoices("Pyro_highfive0{{LINE_ID}}.wav", 2)
                }
            ]
        });
    }

    async run(ctx, {
        voice_line: voiceFile
    }) {
        await Promise.all([
            this.playSound(ctx, voiceFile),
            ctx.send("*mmph mmph mph!*")
        ]);
    }
}

module.exports = HighFiveCommand;