import Command from "../lib/VoiceBasedCommand.mjs";

class GoCommand extends Command {
    constructor(...args) {
        super(...args, {
            name: "go",
        });
    }

    async run(ctx) {
        if (await this.canBeRun(ctx)) await Promise.all([
            this.playSound(ctx, "Pyro_go01.wav"),
            ctx.send("*mph*"),
        ]);
    }
}

export default GoCommand;
