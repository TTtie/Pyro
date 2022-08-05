import Command from "../lib/VoiceBasedCommand.mjs";
import { BaseVoiceLineStruct, makeChoices } from "../lib/utils.mjs";

class CritKillCommand extends Command {
    constructor(sosamba, ...args) {
        super(sosamba, ...args, {
            name: "critkill",
            args: [
                {
                    ...BaseVoiceLineStruct,
                    choices: makeChoices("Pyro_paincrticialdeath0{{LINE_ID}}.wav", 3),
                },
            ],
        });
    }

    async run(ctx, {
        voice_line: voiceFile,
    }) {
        if (await this.canBeRun(ctx)) await Promise.all([
            this.playSound(ctx, voiceFile),
            ctx.send("*mmph*"),
        ]);
    }
}

export default CritKillCommand;
