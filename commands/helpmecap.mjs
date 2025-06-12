import Command from "../lib/VoiceBasedCommand.mjs";

class CallForCaptureHelpCommand extends Command {
    constructor(sosamba, ...args) {
        super(sosamba, ...args, {
            name: "helpmecap",
        });
    }

    async run(ctx) {
        if (await this.canBeRun(ctx)) {
            await ctx.send("*MMPH MPH MMMMMPH!*");
            await this.playSound(ctx, "Pyro_helpmecapture01.wav");
        }
    }
}

export default CallForCaptureHelpCommand;
