import Command from "../lib/VoiceBasedCommand.mjs";

class SpecialCompletedWithAssistanceCommand extends Command {
    constructor(...args) {
        super(...args, {
            name: "specialassist",
        });
    }

    async run(ctx) {
        if (await this.canBeRun(ctx)) {
            await ctx.send("*mmmmmph*");
            await this.playSound(ctx, "Pyro_specialcompleted-assistedkill01.wav");
        }
    }
}

export default SpecialCompletedWithAssistanceCommand;
