"use strict";
const { Logger } = require("sosamba");
const { Colors } = require("sosamba/lib/Constants.js");
Colors.SUCCESS = 0xFB524F;
const { prefix, token } = require("./config.json");
global.console = new Logger({
    name: "Console"
});
const Client = require("./lib/PyroClient");
const client = new Client(token, {
    prefix,
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
