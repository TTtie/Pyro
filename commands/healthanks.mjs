import Command from "../lib/VoiceBasedCommand.mjs";

class HealThanksCommand extends Command {
    constructor(sosamba, ...args) {
        super(sosamba, ...args, {
            name: "healthanks",
        });
    }

    async run(ctx) {
        if (await this.canBeRun(ctx)) await Promise.all([
            this.playSound(ctx, "Pyro_thanksfortheheal01.wav"),
            ctx.send("mph!"),
        ]);
    }
}

export default HealThanksCommand;
