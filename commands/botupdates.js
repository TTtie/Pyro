"use strict";
const { Command } = require("sosamba");
const { announcementChannelID } = require("../config");

class UpdateFollowCommand extends Command {
    constructor(...args) {
        super(...args, {
            description: "Receive updates about Pyro in this channel.",
            aliases: ["updates"],
            name: "botupdates"
        });
    }

    permissionCheck(ctx) {
        if (ctx.channel.type !== 0) return false;
        // The channel might not be cached (can happen if the guild has applied only application.commands)
        return ctx.channel.permissionsOf?.(ctx.author.id)?.has("manageWebhooks");
    }

    async run(ctx) {
        if (!ctx.sosamba.hasBotPermission(ctx.channel, "manageWebhooks")) {
            await ctx.send({
                embed: {
                    title: ":x: Missing Permissions",
                    description: "I need to be able to manage webhooks in this channel in order to set up bot updates. After that, you can feel free to remove it from me.",
                    color: 0xff0000,
                }
            });
            return;
        }

        await ctx.sosamba.followChannel(announcementChannelID, ctx.channel.id);
        await ctx.send(`:ok_hand: All the latest and greatest updates about ${ctx.sosamba.user.username} will be sent here.`);
    }
}

module.exports = UpdateFollowCommand;
