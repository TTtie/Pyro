import Command from "../lib/VoiceBasedCommand.mjs";

class StayOnPointCommand extends Command {
    constructor(...args) {
        super(...args, {
            name: "point",
        });
    }

    async run(ctx) {
        if (await this.canBeRun(ctx)) {
            await ctx.send("*MMPH MM MPH MMMPH MPH!!!!*");
            await this.playSound(ctx, "Pyro_standonthepoint01.wav");
        }
    }
}

export default StayOnPointCommand;
