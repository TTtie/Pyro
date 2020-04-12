const Command = require("../lib/VoiceBasedCommand");

class TeleporterThanksCommand extends Command {
    constructor(...args) {
        super(...args, {
            name: "telethanks"
        })
    }

    async run(ctx) {
        await Promise.all([
            this.playSound(ctx, "Pyro_thanksfortheteleporter01.wav"),
            ctx.send("*mmmph mph.*")
        ])
    }
}

module.exports = TeleporterThanksCommand;