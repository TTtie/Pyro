import Command from "../lib/VoiceBasedCommand.mjs";

class TeleporterThanksCommand extends Command {
    constructor(...args) {
        super(...args, {
            name: "telethanks",
        });
    }

    async run(ctx) {
        if (await this.canBeRun(ctx)) {
            await ctx.send("*mmmph mph.*");
            await this.playSound(ctx, "Pyro_thanksfortheteleporter01.wav");
        }
    }
}

export default TeleporterThanksCommand;
