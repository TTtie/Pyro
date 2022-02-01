"use strict";
const Command = require("../lib/VoiceBasedCommand");
const { BaseVoiceLineStruct, makeChoices } = require("../lib/utils");

class TauntCommand extends Command {
    constructor(sosamba, ...args) {
        super(sosamba, ...args, {
            name: "taunt",
            args: [
                {
                    ...BaseVoiceLineStruct,
                    choices: makeChoices("Pyro_taunts0{{LINE_ID}}.wav", 4)
                }
            ]
        });
    }

    async run(ctx, {
        voice_line: voiceFile
    }) {
        if (await this.canBeRun(ctx)) await Promise.all([
            this.playSound(ctx, voiceFile),
            ctx.send("*mmmmph*")
        ]);
    }
}

module.exports = TauntCommand;