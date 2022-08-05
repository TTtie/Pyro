import Command from "../lib/VoiceBasedCommand.mjs";
import { BaseVoiceLineStruct, makeChoices } from "../lib/utils.mjs";

class SpellCommand extends Command {
    constructor(sosamba, ...args) {
        super(sosamba, ...args, {
            name: "spell",
            args: [
                {
                    ...BaseVoiceLineStruct,
                    choices: makeChoices("Pyro_sf13_spell_generic0{{LINE_ID}}.wav", 9),
                },
            ],
        });
    }

    async run(ctx, {
        voice_line: voiceFile,
    }) {
        if (await this.canBeRun(ctx)) await Promise.all([
            this.playSound(ctx, voiceFile),
            ctx.send("*mmmmmph mmmph*"),
        ]);
    }
}

export default SpellCommand;
