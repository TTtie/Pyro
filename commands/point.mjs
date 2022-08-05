import Command from "../lib/VoiceBasedCommand.mjs";

class StayOnPointCommand extends Command {
    constructor(...args) {
        super(...args, {
            name: "point",
        });
    }

    async run(ctx) {
        if (await this.canBeRun(ctx)) await Promise.all([
            this.playSound(ctx, "Pyro_standonthepoint01.wav"),
            ctx.send("*MMPH MM MPH MMMPH MPH!!!!*"),
        ]);
    }
}

export default StayOnPointCommand;
