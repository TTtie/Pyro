import Command from "../lib/VoiceBasedCommand.mjs";

class SpyCommand extends Command {
    constructor(...args) {
        super(...args, {
            name: "spy",
        });
    }

    async run(ctx) {
        if (await this.canBeRun(ctx)) {
            await ctx.send("*mmph mmmmph mph mph!*");
            await this.playSound(ctx, "Pyro_cloakedspy01.wav");
        }
    }
}

export default SpyCommand;
