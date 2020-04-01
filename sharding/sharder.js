const Shard = require("./shard");
const { Worker } = require("worker_threads");
const sipc = require("./evtmap");
const { Collection } = require("eris");
class Sharder {
    constructor(token, shards) {
        if (!shards || typeof shards !== "number") {
            console.error("CRITICAL: I cannot get the number of shards. Please fill out your value correctly in config.json!");
            process.exit(1);
        }
        this.token = token;
        this.shardCount = shards;
        this.IPC = new sipc(this);
        this.shards = new Collection(Shard);
    }

    start() {
        console.log("Spawning the shards.");
        for (let i = 0; i < this.shardCount; i++) {
            this.createShardWorker(i);
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
        worker.on("exit", () => {
            this.createShardWorker(id);
        });
        this.shards.add(new Shard(this, worker, id), undefined, true);
    }

    broadcast(...args) {
        return this.shards.map(s => s.send(...args));
    }
}

module.exports = Sharder;