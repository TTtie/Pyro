import Command from "../lib/VoiceBasedCommand.mjs";
import { BaseVoiceLineStruct, makeChoices } from "../lib/utils.mjs";

class BattleCryCommand extends Command {
    constructor(sosamba, fn, ff) {
        super(sosamba, fn, ff, {
            name: "battlecry",
            args: [
                {
                    ...BaseVoiceLineStruct,
                    choices: makeChoices("Pyro_battlecry0{{LINE_ID}}.wav", 2),
                },
            ],
        });
    }

    async run(ctx, {
        voice_line: voiceFile,
    }) {
        if (await this.canBeRun(ctx)) {
            await ctx.send("*mmph*");
            await this.playSound(ctx, voiceFile);
        }
    }
}

export default BattleCryCommand;
