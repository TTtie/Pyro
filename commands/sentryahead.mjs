import Command from "../lib/VoiceBasedCommand.mjs";

class SentryAheadCommand extends Command {
    constructor(...args) {
        super(...args, {
            name: "sentryahead",
        });
    }

    async run(ctx) {
        if (await this.canBeRun(ctx)) await Promise.all([
            this.playSound(ctx, "Pyro_incoming01.wav"),
            ctx.send("mmmmmmph!!!"),
        ]);
    }
}

export default SentryAheadCommand;
