"use strict";
const Command = require("../lib/VoiceBasedCommand");
const { BaseVoiceLineStruct, makeChoices } = require("../lib/utils");

class InfluxCommand extends Command {
    constructor(sosamba, ...args) {
        super(sosamba, ...args, {
            name: "influx",
            args: [
                {
                    ...BaseVoiceLineStruct,
                    choices: makeChoices("Pyro_sf13_influx0{{LINE_ID}}.wav", 2)
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

module.exports = InfluxCommand;