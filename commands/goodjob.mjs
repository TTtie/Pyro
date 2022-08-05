import Command from "../lib/VoiceBasedCommand.mjs";

class GoodJobCommand extends Command {
    constructor(...args) {
        super(...args, {
            name: "goodjob",
        });
    }

    async run(ctx) {
        if (await this.canBeRun(ctx)) await Promise.all([
            this.playSound(ctx, "Pyro_goodjob01.wav"),
            ctx.send("*mmph mmmmph mph mph!*"),
        ]);
    }
}

export default GoodJobCommand;
