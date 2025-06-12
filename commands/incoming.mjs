import Command from "../lib/VoiceBasedCommand.mjs";

class IncomingCommand extends Command {
    constructor(...args) {
        super(...args, {
            name: "incoming",
        });
    }

    async run(ctx) {
        if (await this.canBeRun(ctx)) {
            await ctx.send("mmmmph mmmph!!!");
            await this.playSound(ctx, "Pyro_incoming01.wav");
        }
    }
}

export default IncomingCommand;
