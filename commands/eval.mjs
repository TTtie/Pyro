import { Command, Eris } from "sosamba";
const { Constants: { ApplicationCommandOptionTypes } } = Eris;
import { inspect } from "util";
import config from "../lib/config.mjs";

const { homeGuild } = config;
const AsyncFunction = (async () => "").constructor;
class EvalCommand extends Command {
    constructor(sosamba, ...args) {
        super(sosamba, ...args, {
            name: "eval",
            description: "Evaluates JavaScript code.",
            args: [{
                name: "code",
                description: "The code to evaluate",
                type: ApplicationCommandOptionTypes.STRING,
                required: true,
            }],
            registerIn: homeGuild,
        });
    }

    permissionCheck(ctx) {
        return ctx.author.id === "150628341316059136";
    }

    async run(ctx, { code: args }) {
        this.log.log(args);
        let d;
        try {
            d = await new AsyncFunction("ctx", "args", "importMeta", args)
                .bind(this)(ctx, args, import.meta);
        } catch (err) {
            d = err.stack;
        }
        const v = typeof d === "string" ? d : inspect(d);
        const description = `\`\`\`js\n${v.replace(this.sosamba.token, "not today")}\n\`\`\``;
        if (description.length > 2048) {
            await ctx.send({
                embed: {
                    title: "Evaluated!",
                    color: 0xFB524F,
                    description: "Unfortunately, we can't provide the data here because they're too long.\nThereby, the output has been logged in the console.",
                },
            });
            this.log.log(v);
        } else {
            ctx.send({
                embed: {
                    description,
                    color: 0xFB524F,
                },
            });
        }
    }
}

export default EvalCommand;
