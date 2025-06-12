import Command from "../lib/VoiceBasedCommand.mjs";
import { BaseVoiceLineStruct, makeChoices } from "../lib/utils.mjs";

class JeerCommand extends Command {
    constructor(sosamba, ...args) {
        super(sosamba, ...args, {
            name: "jeer",
            args: [
                {
                    ...BaseVoiceLineStruct,
                    choices: makeChoices("Pyro_jeers0{{LINE_ID}}.wav", 2),
                },
            ],
        });
    }

    async run(ctx, {
        voice_line: voiceFile,
    }) {
        if (await this.canBeRun(ctx)) {
            await ctx.send("*mmmph*");
            await this.playSound(ctx, voiceFile);
        }
    }
}

export default JeerCommand;
