import Command from "../lib/VoiceBasedCommand.mjs";
import { BaseVoiceLineStruct, makeChoices } from "../lib/utils.mjs";

class HighFiveCommand extends Command {
    constructor(sosamba, ...args) {
        super(sosamba, ...args, {
            name: "highfive",
            args: [
                {
                    ...BaseVoiceLineStruct,
                    choices: makeChoices("Pyro_highfive0{{LINE_ID}}.wav", 2),
                },
            ],
        });
    }

    async run(ctx, {
        voice_line: voiceFile,
    }) {
        await Promise.all([
            this.playSound(ctx, voiceFile),
            ctx.send("*mmph mmph mph!*"),
        ]);
    }
}

export default HighFiveCommand;
