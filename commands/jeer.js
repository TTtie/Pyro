"use strict";
const Command = require("../lib/VoiceBasedCommand");
const { BaseVoiceLineStruct, makeChoices } = require("../lib/utils");

class JeerCommand extends Command {
    constructor(sosamba, ...args) {
        super(sosamba, ...args, {
            name: "jeer",
            args: [
                {
                    ...BaseVoiceLineStruct,
                    choices: makeChoices("Pyro_jeers0{{LINE_ID}}.wav", 2)
                }
            ]
        });
    }

    async run(ctx, {
        voice_line: voiceFile
    }) {
        if (await this.canBeRun(ctx)) await Promise.all([
            this.playSound(ctx, voiceFile),
            ctx.send("*mmmph*")
        ]);
    }
}

module.exports = JeerCommand;