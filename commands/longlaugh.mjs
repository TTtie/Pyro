import Command from "../lib/VoiceBasedCommand.mjs";

class LongLaughCommand extends Command {
    constructor(...args) {
        super(...args, {
            name: "longlaugh",
        });
    }

    async run(ctx) {
        if (await this.canBeRun(ctx)) {
            await ctx.send("mmmmmmmmmmph!!!!!");
            await this.playSound(ctx, "Pyro_laughlong01.wav");
        }
    }
}

export default LongLaughCommand;
