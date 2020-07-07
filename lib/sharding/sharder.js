"use strict";
const Shard = require("./shard");
const { Worker } = require("worker_threads");
const SharderIPC = require("./eventMap");
const { Eris: { Collection } } = require("sosamba");
// Named exports are unhealthy
const Bucket = require("../../node_modules/eris/lib/util/Bucket");
class Sharder {
    constructor(token, shards) {
        if (!shards || typeof shards !== "number") {
            console.error("CRITICAL: I cannot get the number of shards. Please fill out your value correctly in config.json!");
            process.exit(1);
        }
        this.token = token;
        this.shardCount = shards;
        this.IPC = new SharderIPC(this);
        this.shards = new Collection(Shard);
        this.presenceIdentifyBucket = new Bucket(1, 5000);
    }

    async start() {
        console.info("Spawning the shards.");
        for (let i = 0; i < this.shardCount; i++) {
            this.presenceIdentifyBucket.queue(() => this.createShardWorker(i));
        }
    }

    createShardWorker(id) {
        const worker = new Worker("./client.js", {
            workerData: {
                SHARD_ID: id,
                SHARD_COUNT: this.shardCount,
                CLIENT_TOKEN: this.token
            }
        });
        const onError = () => {
            worker.terminate();
            this.createShardWorker(id);
            worker.removeAllListeners();
        };
        worker.on("error", err => {
            console.error(err);
            onError();
        });
        worker.on("exit", onError);
        const shard = new Shard(this, worker, id);
        this.shards.add(shard, undefined, true);
    }

    broadcast(...args) {
        return this.shards.map(s => s.send(...args));
    }
}

module.exports = Sharder;