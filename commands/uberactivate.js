const Command = require("../lib/VoiceBasedCommand");

class UberchargeActivateCommand extends Command {
    constructor(...args) {
        super(...args, {
            name: "uberactivate"
        })
    }

    async run(ctx) {
        await Promise.all([
            this.playSound(ctx, "Pyro_activatecharge01.wav"),
            ctx.send("*mmph*")
        ])
    }
}

module.exports = UberchargeActivateCommand;