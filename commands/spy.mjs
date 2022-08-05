import Command from "../lib/VoiceBasedCommand.mjs";

class SpyCommand extends Command {
    constructor(...args) {
        super(...args, {
            name: "spy",
        });
    }

    async run(ctx) {
        if (await this.canBeRun(ctx)) await Promise.all([
            this.playSound(ctx, "Pyro_cloakedspy01.wav"),
            ctx.send("*mmph mmmmph mph mph!*"),
        ]);
    }
}

export default SpyCommand;
