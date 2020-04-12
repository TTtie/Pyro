"use strict";
const { Command } = require("sosamba");
const sounds = require("./sounds");

class VoiceBasedCommand extends Command {
    async playSound(ctx, name) {
        if (!Object.prototype.hasOwnProperty.call(sounds, name)) {
            throw new Error("Invalid sound file");
        }
        if (ctx.guild.voiceStates.has(ctx.author.id)) {
            const conn = await this.sosamba.joinVoiceChannel(
                ctx.guild.voiceStates.get(ctx.author.id).channelID
            );
            if (conn.playing) { // Someone is already playing something
                return;
            }
            conn.play(sounds.resolveSound(name));
            conn.on("end", () => {
                conn.disconnect();
            });
            conn.on("error", err => {
                throw err;
            });
        }
    }
}

module.exports = VoiceBasedCommand;