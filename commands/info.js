"use strict";
const { Command } = require("sosamba");
const { workerData: { SHARD_ID } } = require("worker_threads");

class AboutCommand extends Command {
    constructor(...args) {
        super(...args, {
            name: "info",
            description: "Shows some information about me.",
            aliases: ["about"]
        });
    }

    async run(ctx) {
        await ctx.send({
            embed: {
                author: {
                    name: "About Pyro Bot",
                    icon_url: this.sosamba.user.avatarURL
                },
                description: "Made by <@150628341316059136> (TTtie#1381)",
                fields: [{
                    name: "Shard info",
                    value: `ID: ${SHARD_ID}\nServers: ${this.sosamba.guilds.size}`
                }, {
                    name: "Invite me",
                    value: "https://discordapp.com/oauth2/authorize?client_id=242249568794836993&scope=bot"
                }, {
                    name: "Other information",
                    value: "[Support server](https://discord.gg/pGN5dMq)\n[Source code](https://github.com/tttie/pyro)\n[Privacy policy](https://tttie.cz/privacy/pyro.html)\n**We're not affliated with Valve Corp.**",
                }],
                color: 0xFB524F
            }
        });
    }
}

module.exports = AboutCommand;
