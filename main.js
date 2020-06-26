"use strict";
const { token, shards } = require("./config.json");
const { Logger } = require("sosamba");
const dbotsPost = require("./dbots");
global.console = new Logger({
    name: "Master"
});
const sharderClass = require("./lib/sharding/sharder");
const sharder = new sharderClass(token, shards);
const guildDataMap = new Map();
let readyShards = 0;

const doDBotsPost = () => {
    console.info("Posting to DBots.");
    dbotsPost(Array.from(guildDataMap.values()).reduce((a, b) => a + b))
        .then(() => {
            console.info("Successfully posted to DBots!");
        }).catch(console.error);
}

sharder.IPC.on("ready", ({ id, guilds }, cback) => {
    console.info(`Shard ${id} is ready to serve ${guilds} guilds!`);
    guildDataMap.set(id, guilds);
    readyShards++;
    if (readyShards === shards) {
        console.info("Connected to Discord!");
        doDBotsPost();
        setInterval(doDBotsPost, 1800000);
    }
    cback();
});

sharder.IPC.on("sendGuilds", ({ id, guilds }, cback) => {
    guildDataMap.set(id, guilds);
    cback();
});


sharder.IPC.on("die", (_, cb) => {
    sharder.broadcast("GOAWAY");
    cb();
    setTimeout(() => process.exit(0), 10000);
});
sharder.start();