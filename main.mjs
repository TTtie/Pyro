import { Logger, Client } from "sosamba";
import inspector from "inspector";
import config from "./lib/config.mjs";
const { token } = config;

if (!inspector.url()) globalThis.console = new Logger({
    name: "Console",
});

const client = new Client(token, {
    compress: true,
    defaultImageFormat: "webp",
    intents: ["guilds", "guildVoiceStates"],
    messageLimit: 0,
});

client.connect();

process.on("unhandledRejection", err => {
    console.warn("Unhandled rejection!");
    console.warn(err);
});

process.on("uncaughtException", err => {
    console.warn("Unhandled exception!");
    console.warn(err);
});
