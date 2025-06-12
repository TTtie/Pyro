import Command from "../lib/VoiceBasedCommand.mjs";

class HeadRightCommand extends Command {
    constructor(...args) {
        super(...args, {
            name: "headright",
        });
    }

    async run(ctx) {
        if (await this.canBeRun(ctx)) {
            await ctx.send("*MMPH MMMPH!*");
            await this.playSound(ctx, "Pyro_headright01.wav");
        }
    }
}

export default HeadRightCommand;
