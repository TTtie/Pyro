import { Command, Dysnomia } from "sosamba";
const { Constants: { ComponentTypes, ButtonStyles, MessageFlags } } = Dysnomia;
import sounds, { resolveSound } from "./sounds.mjs";

class VoiceBasedCommand extends Command {
    playSound(ctx, name) {
        // eslint-disable-next-line no-async-promise-executor
        return new Promise(async (rs, rj) => {
            if (!sounds.has(name)) {
                rj(new Error("Invalid sound file"));
            }
            if (ctx.guild.voiceStates.has(ctx.author.id) && !this.sosamba.voiceConnections.has(ctx.guild.id)) {
                const voiceChannel = ctx.guild.channels.get(ctx.guild.voiceStates.get(ctx.author.id).channelID);
                if (!voiceChannel?.permissionsOf(this.sosamba.user.id).has("voiceConnect")) return;
                const conn = await voiceChannel.join(
                    {
                        selfDeaf: true,
                        selfMute: false,
                    },
                ).catch(err => {
                    rj(err);
                    return;
                });
                if (!conn) return;

                if (conn.playing) { // Someone is already playing something
                    rs();
                    return;
                }
                conn.play(resolveSound(name));
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
                flags: MessageFlags.IS_COMPONENTS_V2,
                components: [
                    {
                        type: ComponentTypes.CONTAINER,
                        components: [
                            {
                                type: ComponentTypes.TEXT_DISPLAY,
                                content: "# :x: This command cannot be run in Direct Messages" +
                                    "\nThis command requires you to be in a server voice channel. Try adding me to a server using the following button and running the command there!",
                            },
                            {
                                type: ComponentTypes.ACTION_ROW,
                                components: [
                                    {
                                        type: ComponentTypes.BUTTON,
                                        style: ButtonStyles.LINK,
                                        url: `https://discord.com/oauth2/authorize?client_id=${this.sosamba.application.id}&scope=bot+applications.commands`,
                                        label: "Add to a server",
                                    },
                                ],
                            },
                        ],
                        accent_color: 0xFF0000,
                    },
                ],
            });

            return false;
        }

        if (!this.sosamba.guilds.has(ctx.guild.id)) {
            await ctx.send({
                flags: MessageFlags.IS_COMPONENTS_V2,
                components: [
                    {
                        type: ComponentTypes.CONTAINER,
                        components: [
                            {
                                type: ComponentTypes.TEXT_DISPLAY,
                                content: "# :x: Missing Access" +
                                    "\nPyro must be present on this server with both bot and slash command access. Click the following button to grant additional permissions:",
                            },
                            {
                                type: ComponentTypes.ACTION_ROW,
                                components: [
                                    {
                                        type: ComponentTypes.BUTTON,
                                        style: ButtonStyles.LINK,
                                        url: `https://discord.com/oauth2/authorize?client_id=${this.sosamba.application.id}&scope=bot+applications.commands&guild_id=${ctx.guild.id}`,
                                        label: "Reauthorize",
                                    },
                                ],
                            },
                        ],
                        accent_color: 0xFF0000,
                    },
                ],
            });

            return false;
        }

        return true;
    }
}

export default VoiceBasedCommand;
