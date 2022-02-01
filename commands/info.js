"use strict";
const { Command, Eris: { VERSION: erisVersion } } = require("sosamba");
const { version: sosambaVersion } = require("sosamba/package.json");

class AboutCommand extends Command {
    constructor(...args) {
        super(...args, {
            name: "info",
            description: "Shows some information about me.",
        });
    }

    async run(ctx) {
        await ctx.send({
            embeds: [{
                author: {
                    name: "About Pyro Bot",
                    icon_url: this.sosamba.user.avatarURL
                },
                description: "Made by <@150628341316059136> (TTtie#1381)",
                fields: [{
                    name: "Info",
                    value: `Servers: ${this.sosamba.guilds.size}\nRunning on Sosamba v${sosambaVersion} (Eris v${erisVersion}; Node.js v${process.versions.node})`
                }, {
                    name: "Invite me",
                    value: `https://discord.com/oauth2/authorize?client_id=${this.sosamba.application.id}&scope=bot+applications.commands`
                }, {
                    name: "Other information",
                    value: "[Support server](https://discord.gg/pGN5dMq)\n[Source code](https://github.com/tttie/pyro)\n[Privacy policy](https://tttie.cz/privacy/pyro.html)",
                }],
                footer: {
                    text: "We're not affliated with Valve Corp."
                },
                color: 0xFB524F
            }]
        });
    }
}

module.exports = AboutCommand;
