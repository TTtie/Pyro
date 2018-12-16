const {token, shards} = require("./config.json")
const sharderClass = require("./sharding/sharder")
const sharder = new sharderClass(token, shards, process);
let readyShards = 0;
sharder.IPC.on("ready", ({id, guilds}, cback) => {
    console.log(`Shard ${id} is ready to serve ${guilds} guilds!`)
    readyShards++;
    if (readyShards == shards) console.log(`-------- PYRO BOT --------\nReady to bring experience of Pyro from TF2 to the Discord servers!\nMade by TTtie (https://github.com/TTtie)\nGitHub: https://github.com/TTtie\nDiscord: https://discord.gg/pGN5dMq`)
    cback()
})

sharder.IPC.on("sendGuilds", ({id, guilds}, cback) => {
    require("./dbots").post(guilds, id, shards).then(ok => cback(ok));
})
sharder.IPC.on("runCommand", ({id, name, args, guild, invoker}, cback) => {
    console.log(`${invoker} ran command ${name} on shard ${id} in a guild ${guild} with these arguments: ${args}`)
    cback()
})

sharder.start();