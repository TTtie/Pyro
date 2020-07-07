"use strict";
const { Command } = require("sosamba");
const sounds = require("./sounds");

class VoiceBasedCommand extends Command {
    playSound(ctx, name) {
        // eslint-disable-next-line no-async-promise-executor
        return new Promise(async (rs, rj) => {
            if (!Object.prototype.hasOwnProperty.call(sounds, name)) {
                rj(new Error("Invalid sound file"));
            }
            if (ctx.guild.voiceStates.has(ctx.author.id)) {
                const conn = await this.sosamba.joinVoiceChannel(
                    ctx.guild.voiceStates.get(ctx.author.id).channelID
                );
                if (conn.playing) { // Someone is already playing something
                    return;
                }
                conn.play(sounds.resolveSound(name));
                // There's still an old voice connection present
                if (!conn.listenerCount("end") && !conn.listenerCount("error")) {
                    conn.on("end", () => {
                        conn.disconnect();
                    });
                    conn.on("error", err => {
                        rj(err);
                    });
                }
            }
        });
    }
}

module.exports = VoiceBasedCommand;
