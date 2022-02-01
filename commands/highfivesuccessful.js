"use strict";
const Command = require("../lib/VoiceBasedCommand");
const { BaseVoiceLineStruct, makeChoices } = require("../lib/utils");

class HighFiveSuccessfulCommand extends Command {
    constructor(sosamba, ...args) {
        super(sosamba, ...args, {
            name: "highfivesuccessful",
            args: [
                {
                    ...BaseVoiceLineStruct,
                    choices: makeChoices("Pyro_highfive_success0{{LINE_ID}}.wav", 3)
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

module.exports = HighFiveSuccessfulCommand;