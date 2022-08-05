import Command from "../lib/VoiceBasedCommand.mjs";

class CPCapCommand extends Command {
    constructor(sosamba, ...args) {
        super(sosamba, ...args, {
            name: "cpcap",
        });
    }

    async run(ctx) {
        if (await this.canBeRun(ctx)) await Promise.all([
            this.playSound(ctx, "Pyro_autocappedcontrolpoint01.wav"),
            ctx.send("mmmmmph mmmph mmmmmmph!"),
        ]);
    }
}

export default CPCapCommand;
