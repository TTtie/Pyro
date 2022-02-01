"use strict";
const { Eris: { Constants: { ApplicationCommandOptionTypes: { STRING } } } } = require("sosamba");

const Utils = {
    /**
     * @type {import("eris").ApplicationCommandOptions}
     */
    BaseVoiceLineStruct: {
        name: "voice_line",
        description: "The voice line to play",
        type: STRING,
        required: true,
    },

    makeChoices(vlTemplate, max) {
        const arr = new Array(max);

        for (let i = 0; i < max; i++) {
            arr[i] = {
                name: `Sound #${i + 1}`,
                value: vlTemplate.replace("{{LINE_ID}}", i + 1)
            };
        }

        return arr;
    }
};

module.exports = Utils;