const Command = require("../lib/VoiceBasedCommand");

class GoCommand extends Command {
    constructor(...args) {
        super(...args, {
            name: "go"
        })
    }

    async run(ctx) {
        await Promise.all([
            this.playSound(ctx, "Pyro_go01.wav"),
            ctx.send("*mph*")
        ])
    }
}

module.exports = GoCommand;