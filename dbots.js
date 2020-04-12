"use strict";
const { post } = require("chainfetch");
const { dbotstoken } = require("./config.json");
const Bucket = require("./node_modules/eris/lib/util/Bucket");
const ratelimitBucket = new Bucket(1, 2000); // for safety, should be 20 per second
module.exports = (guilds, shard, shards) => {
    if (!dbotstoken) return Promise.resolve();
    return new Promise((rs, rj) => {
        ratelimitBucket.queue(() => {
            post("https://discord.bots.gg/api/v1/bots/242249568794836993/stats")
                .set({
                    "Content-Type": "application/json",
                    "Authorization": dbotstoken
                }).send({
                    shardId: shard,
                    shardCount: shards,
                    guildCount: guilds
                }).toJSON().then(rs, rj);
        })
    })
};