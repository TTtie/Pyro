const Command = require("../lib/VoiceBasedCommand");
const VoiceLineParser = require("../lib/VoiceLineParser");

class CompLoseCommand extends Command {
    constructor(sosamba, ...args) {
        super(sosamba, ...args, {
            name: "complose",
            args: "[1-3]",
            argParser: new VoiceLineParser(sosamba, {
                voiceLineName: "Cm_pyro_pregamelostlast_0{{LINE_ID}}.mp3"
            })
        });
    }

    async run(ctx, voiceFile) {
        await Promise.all([
            this.playSound(ctx, voiceFile),
            ctx.send("*m ph*")
        ]);
    }
}

module.exports = CompLoseCommand;