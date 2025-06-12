import Command from "../lib/VoiceBasedCommand.mjs";

class HealThanksCommand extends Command {
    constructor(sosamba, ...args) {
        super(sosamba, ...args, {
            name: "healthanks",
        });
    }

    async run(ctx) {
        if (await this.canBeRun(ctx)) {
            await ctx.send("mph!");
            await this.playSound(ctx, "Pyro_thanksfortheheal01.wav");
        }
    }
}

export default HealThanksCommand;
