"use strict";
const Command = require("../lib/VoiceBasedCommand");
const { BaseVoiceLineStruct, makeChoices } = require("../lib/utils");

class EvilLaughCommand extends Command {
    constructor(sosamba, ...args) {
        super(sosamba, ...args, {
            name: "evillaugh",
            args: [
                {
                    ...BaseVoiceLineStruct,
                    choices: makeChoices("Pyro_laughevil0{{LINE_ID}}.wav", 4)
                }
            ]
        });
    }

    async run(ctx, {
        voice_line: voiceFile
    }) {
        if (await this.canBeRun(ctx)) await Promise.all([
            this.playSound(ctx, voiceFile),
            ctx.send("*mmmmmmph!*")
        ]);
    }
}

module.exports = EvilLaughCommand;