import Command from "../lib/VoiceBasedCommand.mjs";

class YesCommand extends Command {
    constructor(...args) {
        super(...args, {
            name: "yes",
        });
    }

    async run(ctx) {
        if (await this.canBeRun(ctx)) await Promise.all([
            this.playSound(ctx, "Pyro_yes01.wav"),
            ctx.send("*mph*"),
        ]);
    }
}

export default YesCommand;
