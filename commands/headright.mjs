import Command from "../lib/VoiceBasedCommand.mjs";

class HeadRightCommand extends Command {
    constructor(...args) {
        super(...args, {
            name: "headright",
        });
    }

    async run(ctx) {
        if (await this.canBeRun(ctx)) await Promise.all([
            this.playSound(ctx, "Pyro_headright01.wav"),
            ctx.send("*MMPH MMMPH!*"),
        ]);
    }
}

export default HeadRightCommand;
