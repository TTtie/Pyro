import Command from "../lib/VoiceBasedCommand.mjs";

class CallForHelpCommand extends Command {
    constructor(sosamba, ...args) {
        super(sosamba, ...args, {
            name: "helpme",
        });
    }

    async run(ctx) {
        if (await this.canBeRun(ctx)) {
            await ctx.send("*MMPH MPH!*");
            await this.playSound(ctx, "Pyro_helpme01.wav");
        }
    }
}

export default CallForHelpCommand;
