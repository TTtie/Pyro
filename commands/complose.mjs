import Command from "../lib/VoiceBasedCommand.mjs";
import { BaseVoiceLineStruct, makeChoices } from "../lib/utils.mjs";

class CompLoseCommand extends Command {
    constructor(sosamba, ...args) {
        super(sosamba, ...args, {
            name: "complose",
            args: [
                {
                    ...BaseVoiceLineStruct,
                    choices: makeChoices("Cm_pyro_pregamelostlast_0{{LINE_ID}}.mp3", 3),
                },
            ],
        });
    }

    async run(ctx, {
        voice_line: voiceFile,
    }) {
        if (await this.canBeRun(ctx)) await Promise.all([
            this.playSound(ctx, voiceFile),
            ctx.send("*m ph*"),
        ]);
    }
}

export default CompLoseCommand;
