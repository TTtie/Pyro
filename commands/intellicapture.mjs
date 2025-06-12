import Command from "../lib/VoiceBasedCommand.mjs";

class IntelligenceCaptureCommand extends Command {
    constructor(...args) {
        super(...args, {
            name: "intellicapture",
        });
    }

    async run(ctx) {
        if (await this.canBeRun(ctx)) {
            await ctx.send("mmmmmmmmmmph mmmmmmph!");
            await this.playSound(ctx, "Pyro_autocappedintelligence01.wav");
        }
    }
}

export default IntelligenceCaptureCommand;
