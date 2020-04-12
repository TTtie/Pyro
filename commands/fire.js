const Command = require("../lib/VoiceBasedCommand");
const VoiceLineParser = require("../lib/VoiceLineParser");

class FireCommand extends Command {
    constructor(sosamba, ...args) {
        super(sosamba, ...args, {
            name: "fire",
            args: "[1-2]",
            argParser: new VoiceLineParser(sosamba, {
                voiceLineName: "Pyro_autoonfire0{{LINE_ID}}.wav"
            })
        });
    }

    async run(ctx, voiceFile) {
        await Promise.all([
            this.playSound(ctx, voiceFile),
            ctx.send("*mmph!*")
        ]);
    }
}

module.exports = FireCommand;