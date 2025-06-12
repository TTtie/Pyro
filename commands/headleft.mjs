import Command from "../lib/VoiceBasedCommand.mjs";

class HeadLeftCommand extends Command {
    constructor(...args) {
        super(...args, {
            name: "headleft",
        });
    }

    async run(ctx) {
        if (await this.canBeRun(ctx)) {
            await ctx.send("*MMPH MMPH!*");
            await this.playSound(ctx, "Pyro_headleft01.wav");
        }
    }
}

export default HeadLeftCommand;
