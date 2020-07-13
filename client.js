"use strict";
const { isMainThread, 
    workerData: { CLIENT_TOKEN, SHARD_ID, SHARD_COUNT } } = require("worker_threads");
if (isMainThread) return console.log("Please start the bot using main.js");
const { Logger } = require("sosamba");
const { Colors } = require("sosamba/lib/Constants");
Colors.SUCCESS = 0xFB524F;
const { prefix } = require("./config.json");
global.console = new Logger({
    name: `Shard ${SHARD_ID}`
});
const Client = require("./lib/PyroClient");
const client = new Client(CLIENT_TOKEN, {
    firstShardID: SHARD_ID,
    lastShardID: SHARD_ID,
    maxShards: SHARD_COUNT,
    prefix,
    compress: true,
    intents: ["guilds", "guildMessages", "guildMessageReactions", "guildVoiceStates"],
    messageLimit: 0,
});

client.IPC.on("GOAWAY", () => {
    client.log.info("Going down...");
    client.disconnect({
        reconnect: false
    });
});

client.connect();
