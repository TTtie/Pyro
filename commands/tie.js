const Command = require("../lib/VoiceBasedCommand");

class TieCommand extends Command {
    constructor(...args) {
        super(...args, {
            name: "tie"
        })
    }

    async run(ctx) {
        await Promise.all([
            this.playSound(ctx, "Pyro_autodejectedtie01.wav"),
            ctx.send("*mmph*")
        ])
    }
}

module.exports = TieCommand;