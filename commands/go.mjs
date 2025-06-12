import Command from "../lib/VoiceBasedCommand.mjs";

class GoCommand extends Command {
    constructor(...args) {
        super(...args, {
            name: "go",
        });
    }

    async run(ctx) {
        if (await this.canBeRun(ctx)) {
            await ctx.send("*mph*");
            await this.playSound(ctx, "Pyro_go01.wav");
        }
    }
}

export default GoCommand;
