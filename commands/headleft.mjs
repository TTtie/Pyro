import Command from "../lib/VoiceBasedCommand.mjs";

class HeadLeftCommand extends Command {
    constructor(...args) {
        super(...args, {
            name: "headleft",
        });
    }

    async run(ctx) {
        if (await this.canBeRun(ctx)) await Promise.all([
            this.playSound(ctx, "Pyro_headleft01.wav"),
            ctx.send("*MMPH MMPH!*"),
        ]);
    }
}

export default HeadLeftCommand;
