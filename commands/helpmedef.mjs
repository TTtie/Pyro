import Command from "../lib/VoiceBasedCommand.mjs";

class CallForDefendHelpCommand extends Command {
    constructor(sosamba, ...args) {
        super(sosamba, ...args, {
            name: "helpmedef",
        });
    }

    async run(ctx) {
        if (await this.canBeRun(ctx)) {
            await ctx.send("*MMPH MPH MMMMPH!*");
            await this.playSound(ctx, "Pyro_helpmedefend01.wav");
        }
    }
}

export default CallForDefendHelpCommand;
