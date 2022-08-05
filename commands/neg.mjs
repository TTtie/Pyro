import Command from "../lib/VoiceBasedCommand.mjs";

class NegativeCommand extends Command {
    constructor(...args) {
        super(...args, {
            name: "neg",
        });
    }

    async run(ctx) {
        if (await this.canBeRun(ctx)) await Promise.all([
            this.playSound(ctx, "Pyro_negativevocalization01.wav"),
            ctx.send("mph mph."),
        ]);
    }
}

export default NegativeCommand;
