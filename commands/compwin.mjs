import Command from "../lib/VoiceBasedCommand.mjs";

class CompWinCommand extends Command {
    constructor(sosamba, ...args) {
        super(sosamba, ...args, {
            name: "compwin",
        });
    }

    async run(ctx) {
        if (await this.canBeRun(ctx)) await Promise.all([
            this.playSound(ctx, "Cm_pyro_pregamewonlast_01.mp3"),
            ctx.send("*m mph!*"),
        ]);
    }
}

export default CompWinCommand;
