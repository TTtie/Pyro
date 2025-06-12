import Command from "../lib/VoiceBasedCommand.mjs";

class PositiveCommand extends Command {
    constructor(...args) {
        super(...args, {
            name: "pos",
        });
    }

    async run(ctx) {
        if (await this.canBeRun(ctx)) {
            await ctx.send("mph, mph!");
            await this.playSound(ctx, "Pyro_positivevocalization01.wav");
        }
    }
}

export default PositiveCommand;
