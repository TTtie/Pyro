import Command from "../lib/VoiceBasedCommand.mjs";

class ShortLaughCommand extends Command {
    constructor(...args) {
        super(...args, {
            name: "shortlaugh",
        });
    }

    async run(ctx) {
        if (await this.canBeRun(ctx)) {
            await ctx.send("mmmmph!!!");
            await this.playSound(ctx, "Pyro_laughshort01.wav");
        }
    }
}

export default ShortLaughCommand;
