const pp = require("process-as-promised");
const Shard = require("./shard")
const cluster = require("cluster");
const sipc = require("./evtmap");
const { Collection } = require("eris");
class Sharder {
    constructor(token, shards, proc) {
        const client = new (require("eris").Client)(token, { restMode: true });
        if (!shards || typeof shards !== "number") {
            console.error("CRITICAL: I cannot get the number of shards. Please fill out your value correctly in config.json!")
        }
        this.token = token;
        this.shardCount = shards;
        this.IPC = new sipc(this);
        this.cluster = cluster;
        this.cluster.setupMaster({
            exec: "client.js",
            windowsHide: true
        })
        this.shards = new Collection(Shard);
    }

    start() {
        console.log("Spawning the shards.")
        for (let i = 0; i < this.shardCount; i++) {
            const w = this.cluster.fork({
                SHARD_ID: i,
                SHARD_COUNT: this.shardCount,
                CLIENT_TOKEN: this.token
            });
            w.on("exit", () => {
                this.cluster.fork({
                    SHARD_ID: i,
                    SHARD_COUNT: this.shardCount,
                    CLIENT_TOKEN: this.token
                })
                this.shards.add(new Shard(this, w.process, w, i), undefined, true)
            });
            this.shards.add(new Shard(this, w.process, w, i));
        }
    }

    broadcast(...args) {
        return this.shards.map(s => s.send(...args));
    }
}

module.exports = Sharder;