const {token, shards} = require("./config.json");
const { Logger } = require("sosamba");
global.console = new Logger({
    name: "Master"
});
const sharderClass = require("./lib/sharding/sharder");
const sharder = new sharderClass(token, shards);
sharder.IPC.on("ready", ({id, guilds}, cback) => {
    console.info(`Shard ${id} is ready to serve ${guilds} guilds!`);
    cback();
});

sharder.IPC.on("sendGuilds", ({id, guilds}, cback) => {
    require("./dbots").post(guilds, id, shards).then(ok => cback(ok));
});

sharder.IPC.on("die", (_, cb) => {
    sharder.broadcast("GOAWAY")
    cb();
})
sharder.start();