import Command from "../lib/VoiceBasedCommand.mjs";

class HappyLaughCommand extends Command {
    constructor(sosamba, ...args) {
        super(sosamba, ...args, {
            name: "happylaugh",
        });
    }

    async run(ctx) {
        if (await this.canBeRun(ctx)) {
            await ctx.send("mph!");
            await this.playSound(ctx, "Pyro_laughhappy01.wav");
        }
    }
}

export default HappyLaughCommand;
