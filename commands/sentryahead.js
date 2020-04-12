const Command = require("../lib/VoiceBasedCommand");

class SentryAheadCommand extends Command {
    constructor(...args) {
        super(...args, {
            name: "sentryahead"
        })
    }

    async run(ctx) {
        await Promise.all([
            this.playSound(ctx, "Pyro_incoming01.wav"),
            ctx.send("mmmmmmph!!!")
        ])
    }
}

module.exports = SentryAheadCommand;