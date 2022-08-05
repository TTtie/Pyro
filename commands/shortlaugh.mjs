import Command from "../lib/VoiceBasedCommand.mjs";

class ShortLaughCommand extends Command {
    constructor(...args) {
        super(...args, {
            name: "shortlaugh",
        });
    }

    async run(ctx) {
        if (await this.canBeRun(ctx)) await Promise.all([
            this.playSound(ctx, "Pyro_laughshort01.wav"),
            ctx.send("mmmmph!!!"),
        ]);
    }
}

export default ShortLaughCommand;
