import Command from "../lib/VoiceBasedCommand.mjs";

class GoodJobCommand extends Command {
    constructor(...args) {
        super(...args, {
            name: "goodjob",
        });
    }

    async run(ctx) {
        if (await this.canBeRun(ctx)) {
            await ctx.send("*mmph mmmmph mph mph!*");
            await this.playSound(ctx, "Pyro_goodjob01.wav");
        }
    }
}

export default GoodJobCommand;
