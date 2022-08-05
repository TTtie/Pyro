import Command from "../lib/VoiceBasedCommand.mjs";
import { BaseVoiceLineStruct, makeChoices } from "../lib/utils.mjs";

class FireCommand extends Command {
    constructor(sosamba, ...args) {
        super(sosamba, ...args, {
            name: "fire",
            args: [
                {
                    ...BaseVoiceLineStruct,
                    choices: makeChoices("Pyro_autoonfire0{{LINE_ID}}.wav", 2),
                },
            ],
        });
    }

    async run(ctx, {
        voice_line: voiceFile,
    }) {
        if (await this.canBeRun(ctx)) await Promise.all([
            this.playSound(ctx, voiceFile),
            ctx.send("*mmph!*"),
        ]);
    }
}

export default FireCommand;
