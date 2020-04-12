const Command = require("../lib/VoiceBasedCommand");
const VoiceLineParser = require("../lib/VoiceLineParser");

class EvilLaughCommand extends Command {
    constructor(sosamba, ...args) {
        super(sosamba, ...args, {
            name: "evillaugh",
            args: "[1-4]",
            argParser: new VoiceLineParser(sosamba, {
                voiceLineName: "Pyro_laughevil0{{LINE_ID}}.wav"
            })
        });
    }

    async run(ctx, voiceFile) {
        await Promise.all([
            this.playSound(ctx, voiceFile),
            ctx.send("*mmmmmmph!*")
        ]);
    }
}

module.exports = EvilLaughCommand;