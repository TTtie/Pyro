"use strict";
const { post } = require("chainfetch");
const { dbotstoken } = require("./config.json");
const Bucket = require("./node_modules/eris/lib/util/SequentialBucket");
const ratelimitBucket = new Bucket(1, {
    latency: 500,
    raw: new Array(10).fill(500),
});
module.exports = (guilds, shard, shards) => {
    if (!dbotstoken) return Promise.resolve();
    return new Promise((rs, rj) => {
        ratelimitBucket.queue((cb) => {
            const b4 = Date.now();
            post("https://discord.bots.gg/api/v1/bots/242249568794836993/stats")
                .set({
                    "Content-Type": "application/json",
                    "Authorization": dbotstoken
                }).send({
                    shardId: shard,
                    shardCount: shards,
                    guildCount: guilds
                }).toJSON().then(resp => {
                    const now = Date.now();
                    const latency = Date.now() - b4;

                    ratelimitBucket.latencyRef.raw.push(latency);
                    ratelimitBucket.latencyRef.latency = ratelimitBucket.latencyRef.latency -
                        ~~(ratelimitBucket.latencyRef.raw.shift() / 10) + ~~(latency / 10);
                    if (resp.headers.get("x-ratelimit-limit")) {
                        ratelimitBucket.limit = +resp.headers.get("x-ratelimit-limit");
                    }
                    if (resp.headers.get("retry-after")) {
                        ratelimitBucket.reset = (+resp.headers.get("retry-after") || 1) + now;
                    } else if (resp.headers.get("x-ratelimit-reset")) {
                        ratelimitBucket.reset = Math.max(+resp.headers.get("x-ratelimit-reset") * 1000, now);
                    } else {
                        ratelimitBucket.reset = now;
                    }
                    cb();
                    rs(resp);
                }, err => {
                    if (err.status === 429) {
                        const now = Date.now();
                        const latency = Date.now() - b4;

                        ratelimitBucket.latencyRef.raw.push(latency);
                        ratelimitBucket.latencyRef.latency = ratelimitBucket.latencyRef.latency -
                            ~~(ratelimitBucket.latencyRef.raw.shift() / 10) + ~~(latency / 10);
                        console.error("Unexpected 429 :(")
                        console.error(err.body);
                        console.error(`${now}: ${latency}ms (${ratelimitBucket.latencyRef.latency}ms avg)`)
                        console.error(`${ratelimitBucket.remaining}/${ratelimitBucket.limit} left`)
                        console.error(`Reset ${ratelimitBucket.reset} (${ratelimitBucket.reset - now}ms left)`)
                        if (resp.headers.get("retry-after")) {
                            setTimeout(() => {
                                cb();
                                module.exports(guilds, shard, shards).then(rs, rj);
                            }, +resp.headers.get("retry-after"));
                            return;
                        } else {
                            cb();
                            module.exports(guilds, shard, shards).then(rs, rj);
                            return;
                        }
                    }
                    rj(err);
                });
        })
    })
};