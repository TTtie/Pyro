import Command from "../lib/VoiceBasedCommand.mjs";

class UberchargeActivateCommand extends Command {
    constructor(...args) {
        super(...args, {
            name: "uberactivate",
        });
    }

    async run(ctx) {
        if (await this.canBeRun(ctx)) {
            await ctx.send("*mmph*");
            await this.playSound(ctx, "Pyro_activatecharge01.wav");
        }
    }
}

export default UberchargeActivateCommand;
