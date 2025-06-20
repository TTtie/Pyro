import Command from "../lib/VoiceBasedCommand.mjs";

class SpecialCompletedCommand extends Command {
    constructor(...args) {
        super(...args, {
            name: "special",
        });
    }

    async run(ctx) {
        if (await this.canBeRun(ctx)) {
            await ctx.send("*mmmmmph*");
            await this.playSound(ctx, "Pyro_specialcompleted01.wav");
        }
    }
}

export default SpecialCompletedCommand;
