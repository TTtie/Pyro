import { Eris } from "sosamba";

const { Constants: { ApplicationCommandOptionTypes: { STRING } } } = Eris;

/**
 * @type {import("eris").ApplicationCommandOptions}
 */
export const BaseVoiceLineStruct = {
    name: "voice_line",
    description: "The voice line to play",
    type: STRING,
    required: true,
};


export function makeChoices(vlTemplate, max) {
    const arr = new Array(max);

    for (let i = 0; i < max; i++) {
        arr[i] = {
            name: `Sound #${i + 1}`,
            value: vlTemplate.replace("{{LINE_ID}}", i + 1),
        };
    }

    return arr;
}
