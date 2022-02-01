"use strict";
const { Command, Eris: { Constants: { ComponentTypes, ButtonStyles } } } = require("sosamba");
const sounds = require("./sounds");

class VoiceBasedCommand extends Command {
    playSound(ctx, name) {
        // eslint-disable-next-line no-async-promise-executor
        return new Promise(async (rs, rj) => {
            if (!Object.prototype.hasOwnProperty.call(sounds, name)) {
                rj(new Error("Invalid sound file"));
            }
            if (ctx.guild.voiceStates.has(ctx.author.id) && !this.sosamba.voiceConnections.has(ctx.guild.id)) {
                const conn = await this.sosamba.joinVoiceChannel(
                    ctx.guild.voiceStates.get(ctx.author.id).channelID,
                    {
                        selfDeaf: true,
                        selfMute: false,
                    }
                );
                if (conn.playing) { // Someone is already playing something
                    rs();
                    return;
                }
                conn.play(sounds.resolveSound(name));
                // There's still an old voice connection present
                if (!conn.listenerCount("end") && !conn.listenerCount("error")) {
                    conn.on("end", () => {
                        conn.disconnect();
                        rs();
                    });
                    conn.on("error", err => {
                        rj(err);
                    });
                } else {
                    rs();
                }
            } else {
                rs();
            }
        });
    }

    async canBeRun(ctx) {
        if (!ctx.guild) {
            await ctx.send({
                embeds: [{
                    title: ":x: This command cannot be run in Direct Messages",
                    description: "This command requires you to be in a server voice channel.",
                    color: 0xff0000,
                    footer: {
                        text: "Try adding me to a server using the following button and running the command there!"
                    }
                }],
                components: [{
                    type: ComponentTypes.ACTION_ROW,
                    components: [{
                        type: ComponentTypes.BUTTON,
                        style: ButtonStyles.LINK,
                        url: `https://discord.com/oauth2/authorize?client_id=${this.sosamba.application.id}&scope=bot+applications.commands`,
                        label: "Add to a server"
                    }]
                }]
            });

            return false;
        }

        if (!this.sosamba.guilds.has(ctx.guild.id)) {
            await ctx.send({
                embeds: [{
                    title: ":x: Missing Access",
                    description: "Pyro must be present on this server with both bot and slash command access. Click the following button to grant additional permissions:",
                    color: 0xff0000
                }],
                components: [{
                    type: ComponentTypes.ACTION_ROW,
                    components: [{
                        type: ComponentTypes.BUTTON,
                        style: ButtonStyles.LINK,
                        url: `https://discord.com/oauth2/authorize?client_id=${this.sosamba.application.id}&scope=bot+applications.commands&guild_id=${ctx.guild.id}`,
                        label: "Reauthorize"
                    }]
                }]
            });

            return false;
        }

        return true;
    }
}

module.exports = VoiceBasedCommand;
