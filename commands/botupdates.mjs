import { Command, Dysnomia } from "sosamba";
import config from "../lib/config.mjs";

const { Constants: { ChannelTypes, MessageFlags, ComponentTypes } } = Dysnomia;
const { announcementChannelID } = config;

class UpdateFollowCommand extends Command {
    constructor(...args) {
        super(...args, {
            name: "botupdates",
            description: "Receive updates about Pyro in this channel.",
        });
    }

    permissionCheck(ctx) {
        if (ctx.channel.type !== ChannelTypes.GUILD_TEXT) return false;
        // The channel might not be cached (can happen if the guild has applied only application.commands)
        return ctx.channel.permissionsOf?.(ctx.author.id)?.has("manageWebhooks");
    }

    async run(ctx) {
        if (!ctx.channel.permissionsOf(ctx.sosamba.user.id).has("manageWebhooks")) {
            await ctx.send({
                flags: MessageFlags.IS_COMPONENTS_V2,
                components: [
                    {
                        type: ComponentTypes.CONTAINER,
                        components: [
                            {
                                type: ComponentTypes.TEXT_DISPLAY,
                                content: "# :x: Missing Permissions" +
                                    "\nI need to be able to manage webhooks in this channel in order to set up bot updates. After that, you can feel free to remove it from me.",
                            },
                        ],
                        accent_color: 0xff0000,
                    },
                ],
            });

            return;
        }

        await ctx.sosamba.followChannel(announcementChannelID, ctx.channel.id);
        await ctx.send(`:ok_hand: All the latest and greatest updates about ${ctx.sosamba.user.username} will be sent here.`);
    }
}

export default UpdateFollowCommand;
