const Command = require("../lib/VoiceBasedCommand");

class SpecialCompletedCommand extends Command {
    constructor(...args) {
        super(...args, {
            name: "special"
        })
    }

    async run(ctx) {
        await Promise.all([
            this.playSound(ctx, "Pyro_specialcompleted01.wav"),
            ctx.send("*mmmmmph*")
        ])
    }
}

module.exports = SpecialCompletedCommand;