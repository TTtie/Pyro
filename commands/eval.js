"use strict";
const { Command } = require("sosamba");
const { inspect } = require("util");
const AsyncFunction = (async () => "").constructor;
class EvalCommand extends Command {
    constructor(sosamba, ...args) {
        super(sosamba, ...args, {
            name: "eval",
            description: "Evaluates JavaScript code."
        });
    }

    prerequisites(ctx) {
        return ctx.author.id === "150628341316059136";
    }

    async run(ctx, args) {
        let d;
        try {
            d = await new AsyncFunction("ctx", "args",
                "require", "__dirname", "__filename", "module", args)
                .bind(this)(ctx, args, require, __dirname, __filename, module);
        } catch (err) {
            d = err.stack;
        }
        const v = typeof d === "string" ? d : inspect(d);
        const description = `\`\`\`js\n${v}\n\`\`\``;
        if (description.length > 2048) {
            await ctx.send({
                embed: {
                    title: "Evaluated!",
                    color: 0xFB524F,
                    description: "Unfortunately, we can't provide the data here because they're too long.\nThereby, the output has been logged in the console."
                }
            });
            this.log.log(v);
        } else {
            ctx.send({
                embed: {
                    description,
                    color: 0xFB524F
                }
            });
        }
    }
}

module.exports = EvalCommand;