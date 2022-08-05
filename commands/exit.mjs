import { Command } from "sosamba";
import config from "../lib/config.mjs";

const { homeGuild } = config;

class DieCommand extends Command {
    constructor(...args) {
        super(...args, {
            name: "exit",
            description: "Shuts Pyro down.",
            registerIn: homeGuild,
        });
    }

    permissionCheck(ctx) {
        return ctx.author.id === "150628341316059136";
    }

    async run(ctx) {
        await ctx.send(":wave:");
        await this.sosamba.disconnect({
            reconnect: false,
        });
    }
}

export default DieCommand;
