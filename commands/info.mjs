import { Command, Dysnomia } from "sosamba";
import { sosambaPackage } from "../lib/package.mjs";
const { VERSION: erisVersion, Constants: { MessageFlags, ComponentTypes, ButtonStyles } } = Dysnomia;
const { version: sosambaVersion } = sosambaPackage;

class AboutCommand extends Command {
    constructor(...args) {
        super(...args, {
            name: "info",
            description: "Shows some information about me.",
        });
    }

    async run(ctx) {
        await ctx.send({
            flags: MessageFlags.IS_COMPONENTS_V2,
            components: [{
                type: ComponentTypes.CONTAINER,
                components: [
                    {
                        type: ComponentTypes.SECTION,
                        components: [
                            {
                                type: ComponentTypes.TEXT_DISPLAY,
                                content: "# About Pyro Bot" +
                                    "\nMade by <@150628341316059136> (@tttie)" +
                                    `\nAdded to ${this.sosamba.guilds.size} servers` +
                                    `\nRunning on Sosamba v${sosambaVersion} (Dysnomia v${erisVersion}; Node.js v${process.versions.node})`,
                            },
                        ],
                        accessory: {
                            type: ComponentTypes.THUMBNAIL,
                            media: {
                                url: ctx.sosamba.user.avatarURL,
                            },
                        },
                    },
                    {
                        type: ComponentTypes.ACTION_ROW,
                        components: [
                            {
                                type: ComponentTypes.BUTTON,
                                style: ButtonStyles.LINK,
                                label: "Add to a server",
                                url: `https://discord.com/oauth2/authorize?client_id=${this.sosamba.application.id}&scope=bot+applications.commands`,
                            },
                            {
                                type: ComponentTypes.BUTTON,
                                style: ButtonStyles.LINK,
                                label: "Support",
                                url: "https://discord.gg/pGN5dMq",
                            },
                            {
                                type: ComponentTypes.BUTTON,
                                style: ButtonStyles.LINK,
                                label: "Source code",
                                url: "https://github.com/TTtie/Pyro",
                            },
                            {
                                type: ComponentTypes.BUTTON,
                                style: ButtonStyles.LINK,
                                label: "Privacy policy",
                                url: "https://tttie.cz/privacy/pyro",
                            },
                        ],
                    },
                    {
                        type: ComponentTypes.TEXT_DISPLAY,
                        content: "-# Not affiliated with Valve Corp.",
                    },
                ],
                accent_color: 0xFB524F,
            }],
            allowedMentions: {
                users: false, // Texts in components ping, unlike in embeds
            },
        });
    }
}

export default AboutCommand;
