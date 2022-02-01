"use strict";
const Command = require("../lib/VoiceBasedCommand");
const { BaseVoiceLineStruct, makeChoices } = require("../lib/utils");

class BattleCryCommand extends Command {
    constructor(sosamba, fn, ff) {
        super(sosamba, fn, ff, {
            name: "battlecry",
            args: [
                {
                    ...BaseVoiceLineStruct,
                    choices: makeChoices("Pyro_battlecry0{{LINE_ID}}.wav", 2),
                }
            ]
        });
    }

    async run(ctx, {
        voice_line: voiceFile
    }) {
        if (await this.canBeRun(ctx)) await Promise.all([
            this.playSound(ctx, voiceFile),
            ctx.send("*mmph*")
        ]);
    }
}

module.exports = BattleCryCommand;