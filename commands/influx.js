"use strict";
const Command = require("../lib/VoiceBasedCommand");
const VoiceLineParser = require("../lib/VoiceLineParser");

class InfluxCommand extends Command {
    constructor(sosamba, ...args) {
        super(sosamba, ...args, {
            name: "influx",
            args: "[1-2]",
            argParser: new VoiceLineParser(sosamba, {
                voiceLineName: "Pyro_sf13_influx0{{LINE_ID}}.wav"
            })
        });
    }

    async run(ctx, voiceFile) {
        await Promise.all([
            this.playSound(ctx, voiceFile),
            ctx.send("*mmmmph*")
        ]);
    }
}

module.exports = InfluxCommand;