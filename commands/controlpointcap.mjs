import Command from "../lib/VoiceBasedCommand.mjs";

class CPCapCommand extends Command {
    constructor(sosamba, ...args) {
        super(sosamba, ...args, {
            name: "cpcap",
        });
    }

    async run(ctx) {
        if (await this.canBeRun(ctx)) {
            await ctx.send("mmmmmph mmmph mmmmmmph!");
            await this.playSound(ctx, "Pyro_autocappedcontrolpoint01.wav");
        }
    }
}

export default CPCapCommand;
