import Command from "../lib/VoiceBasedCommand.mjs";

class TeleporterThanksCommand extends Command {
    constructor(...args) {
        super(...args, {
            name: "telethanks",
        });
    }

    async run(ctx) {
        if (await this.canBeRun(ctx)) await Promise.all([
            this.playSound(ctx, "Pyro_thanksfortheteleporter01.wav"),
            ctx.send("*mmmph mph.*"),
        ]);
    }
}

export default TeleporterThanksCommand;
