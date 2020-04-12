const Command = require("../lib/VoiceBasedCommand");

class YesCommand extends Command {
    constructor(...args) {
        super(...args, {
            name: "yes"
        })
    }

    async run(ctx) {
        await Promise.all([
            this.playSound(ctx, "Pyro_yes01.wav"),
            ctx.send("*mph*")
        ])
    }
}

module.exports = YesCommand;