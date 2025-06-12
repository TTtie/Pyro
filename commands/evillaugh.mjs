import Command from "../lib/VoiceBasedCommand.mjs";
import { BaseVoiceLineStruct, makeChoices } from "../lib/utils.mjs";

class EvilLaughCommand extends Command {
    constructor(sosamba, ...args) {
        super(sosamba, ...args, {
            name: "evillaugh",
            args: [
                {
                    ...BaseVoiceLineStruct,
                    choices: makeChoices("Pyro_laughevil0{{LINE_ID}}.wav", 4),
                },
            ],
        });
    }

    async run(ctx, {
        voice_line: voiceFile,
    }) {
        if (await this.canBeRun(ctx)) {
            await ctx.send("*mmmmmmph!*");
            await this.playSound(ctx, voiceFile);
        }
    }
}

export default EvilLaughCommand;
