import { Command, Dysnomia } from "sosamba";
const { Constants: { ApplicationCommandOptionTypes, MessageFlags, ComponentTypes } } = Dysnomia;
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
        await ctx.interaction.defer();
        let d;
        try {
            d = await new AsyncFunction("ctx", "args", "importMeta", args)
                .bind(this)(ctx, args, import.meta);
        } catch (err) {
            d = err.stack;
        }
        const v = typeof d === "string" ? d : inspect(d);
        const result = v.replaceAll(this.sosamba._token, "not today");
        const description = `\`\`\`js\n${result}\n\`\`\``;
        if (description.length > 2048) {
            await ctx.send({
                flags: MessageFlags.IS_COMPONENTS_V2,
                components: [
                    {
                        type: ComponentTypes.CONTAINER,
                        components: [
                            {
                                type: ComponentTypes.TEXT_DISPLAY,
                                content: "# Evaluated!" +
                                    "\nThe result was too long to be sent as a message. The result has been saved as an attachment.",
                            },
                            {
                                type: ComponentTypes.FILE,
                                file: {
                                    url: "attachment://eval.txt",
                                },
                            },
                        ],
                        accent_color: 0xFB524F,
                    },
                ],
                attachments: [
                    {
                        filename: "eval.txt",
                        file: Buffer.from(result),
                    },
                ],
            });
            this.log.log(v);
        } else {
            await ctx.send({
                flags: MessageFlags.IS_COMPONENTS_V2,
                components: [
                    {
                        type: ComponentTypes.CONTAINER,
                        components: [
                            {
                                type: ComponentTypes.TEXT_DISPLAY,
                                content: "# Evaluated!",
                            },
                            {
                                type: ComponentTypes.TEXT_DISPLAY,
                                content: description,
                            },
                        ],
                        accent_color: 0xFB524F,
                    },
                ],
            });
        }
    }
}

export default EvalCommand;
