import Command from "../lib/VoiceBasedCommand.mjs";

class LongLaughCommand extends Command {
    constructor(...args) {
        super(...args, {
            name: "longlaugh",
        });
    }

    async run(ctx) {
        if (await this.canBeRun(ctx)) await Promise.all([
            this.playSound(ctx, "Pyro_laughlong01.wav"),
            ctx.send("mmmmmmmmmmph!!!!!"),
        ]);
    }
}

export default LongLaughCommand;
