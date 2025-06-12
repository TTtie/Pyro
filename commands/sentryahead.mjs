import Command from "../lib/VoiceBasedCommand.mjs";

class SentryAheadCommand extends Command {
    constructor(...args) {
        super(...args, {
            name: "sentryahead",
        });
    }

    async run(ctx) {
        if (await this.canBeRun(ctx)) {
            await ctx.send("mmmmmmph!!!");
            await this.playSound(ctx, "Pyro_sentryahead01.wav");
        }
    }
}

export default SentryAheadCommand;
