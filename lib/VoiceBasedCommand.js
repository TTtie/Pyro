const { Command } = require("sosamba");
const sounds = require("./sounds");

class VoiceBasedCommand extends Command {
    playSound(ctx, name) {
        return new Promise(async (rs, rj) => {
            if (!Object.prototype.hasOwnProperty.call(sounds, name)) {
                rj(new Error("Invalid sound file"));
                return;
            }
            if (ctx.guild.voiceStates.has(ctx.author.id)) {
                try {
                    const conn = await this.sosamba.joinVoiceChannel(
                        ctx.guild.voiceStates.get(ctx.author.id).channelID
                    );
                    if (conn.playing) { // Someone is already playing something
                        rs();
                        return;
                    }
                    conn.play(sounds.resolveSound(name));
                    conn.on("end", () => {
                        conn.disconnect();
                        rs();
                    });
                    conn.on("error", err => {
                        rj(err);
                    });
                } catch (err) {
                    rj(err);
                }
            } else {
                rs();
            }
        });
    }
}

module.exports = VoiceBasedCommand;