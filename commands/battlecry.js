const Command = require("../lib/VoiceBasedCommand");
const VoiceLineParser = require("../lib/VoiceLineParser");

class BattleCryCommand extends Command {
    constructor(sosamba, ...args) {
        super(sosamba, ...args, {
            name: "battlecry",
            args: "[1-2]",
            argParser: new VoiceLineParser(sosamba, {
                voiceLineName: "Pyro_battlecry0{{LINE_ID}}.wav"
            })
        });
    }

    async run(ctx, voiceFile) {
        await Promise.all([
            this.playSound(ctx, voiceFile),
            ctx.send("*mmph*")
        ]);
    }
}

module.exports = BattleCryCommand;