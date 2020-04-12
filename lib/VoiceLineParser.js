"use strict";
const { SimpleArgumentParser, ParsingError } = require("sosamba");
const sounds = require("./sounds");

class VoiceLineParser extends SimpleArgumentParser {
    constructor(sosamba, {
        allowQuotedString,
        separator,
        filterEmptyArguments,
        voiceLineName
    }) {
        super(sosamba, {
            allowQuotedString,
            separator,
            filterEmptyArguments
        });

        this.voiceLineName = voiceLineName;
    }

    async parse(string, ctx) {
        const [voiceLine] = super.parse(string);
        const replacedId = this.voiceLineName.replace("{{LINE_ID}}", voiceLine || "1");
        if (!Object.prototype.hasOwnProperty
            .call(sounds, replacedId)) {
            await ctx.send({
                embed: {
                    color: 0xFF0000,
                    title: ":x: Error parsing your arguments",
                    description: "I'm unable to find your voice line 😥",
                    footer: {
                        text: "Please review your arguments and try again."
                    }
                }
            });
            throw new ParsingError("Invalid voice line");
        } else {
            return replacedId;
        }
    }
}

module.exports = VoiceLineParser;