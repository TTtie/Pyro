import Command from "../lib/VoiceBasedCommand.mjs";

class NegativeCommand extends Command {
    constructor(...args) {
        super(...args, {
            name: "neg",
        });
    }

    async run(ctx) {
        if (await this.canBeRun(ctx)) {
            await ctx.send("mph mph.");
            await this.playSound(ctx, "Pyro_negativevocalization01.wav");
        }
    }
}

export default NegativeCommand;
