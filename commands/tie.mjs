import Command from "../lib/VoiceBasedCommand.mjs";

class TieCommand extends Command {
    constructor(...args) {
        super(...args, {
            name: "tie",
        });
    }

    async run(ctx) {
        if (await this.canBeRun(ctx)) await Promise.all([
            this.playSound(ctx, "Pyro_autodejectedtie01.wav"),
            ctx.send("*mmph*"),
        ]);
    }
}

export default TieCommand;
