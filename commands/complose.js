"use strict";
const Command = require("../lib/VoiceBasedCommand");
const { BaseVoiceLineStruct, makeChoices } = require("../lib/utils");

class CompLoseCommand extends Command {
    constructor(sosamba, ...args) {
        super(sosamba, ...args, {
            name: "complose",
            args: [
                {
                    ...BaseVoiceLineStruct,
                    choices: makeChoices("Cm_pyro_pregamelostlast_0{{LINE_ID}}.mp3", 3)
                }
            ],
        });
    }

    async run(ctx, {
        voice_line: voiceFile
    }) {
        if (await this.canBeRun(ctx)) await Promise.all([
            this.playSound(ctx, voiceFile),
            ctx.send("*m ph*")
        ]);
    }
}

module.exports = CompLoseCommand;