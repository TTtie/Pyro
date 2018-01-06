const {isWorker} = require("cluster");
const fs = require("fs")
const Eris = require("eris");
const pol = require("./polyfillinator")
const sounds = require("./sounds");
const { CLIENT_TOKEN } = process.env;
let { SHARD_ID, SHARD_COUNT } = process.env;
if (!isWorker) return console.log("Please start the bot using main.js")
SHARD_ID = parseInt(SHARD_ID);
SHARD_COUNT = parseInt(SHARD_COUNT);
const client = new Eris.Client(CLIENT_TOKEN, {
    getAllUsers: true,
    firstShardID: SHARD_ID,
    lastShardID: SHARD_ID,
    maxShards: SHARD_COUNT
});


process.on("unhandledRejection", (p, r) => "")
require("./util/defaultChannelPolyfill")();
let cmds = new Eris.Collection(Function);
const loadAll = () => require("./util/commandLoad")(cmds);
function listBotColls() {
    return client.guilds.filter(g => ((g.members.filter(fn => fn.bot).length / g.memberCount) * 100) >= 75)
}
const prefix = "Pyro-"
client.IPC = new (require("process-as-promised"))(process);
client.cmds = cmds;

client.IPC.on("isReady", (_, cb) => {
    if (!client.shards.get(SHARD_ID)) cb(false);
    else cb(client.shards.get(SHARD_ID).ready);
})
client.connect().then(() => 
    client.shards.get(SHARD_ID).on("disconnect", console.error));

client.on("ready", () => {
    dbots();
    client.IPC.send("ready", {
        id: SHARD_ID,
        guilds: client.guilds.size
    })
    setGame();
    loadAll();
    listBotColls().forEach(g => g.leave())
}).on("messageCreate", msg => {
    if (msg.content.startsWith(prefix)) {
        const command = msg.content.slice(prefix.length)
        const [commandName, ...args] = command.split(" ");
        const realArgs = args.join(" ");
        pol(msg);
        if (cmds.get(commandName)) {
            try {
                client.IPC.send("runCommand", {
                    id: SHARD_ID,
                    name: commandName,
                    args: realArgs,
                    guild: `${msg.guild.name} (${msg.guild.id})`,
                    invoker: `${msg.author.username}#${msg.author.discriminator} (${msg.author.id})`
                })
                cmds.get(commandName)(msg, client, realArgs, sounds)
            } catch (e) {
                console.error(e)
            }
        }
    }

}).on("guildCreate", guild => {
    if (listBotColls().includes(guild)) return guild.leave()
    dbots()
}).on("guildDelete", () => {
    dbots()
});
function dbots() {
    client.IPC.send("sendGuilds", {
        id: SHARD_ID,
        guilds: client.guilds.size
    }).then(success => success ? console.log("Successfully posted to DBots.") : console.log("Posting to DBots has resulted in an error."))
}
function setGame() {
    client.editStatus("online", { name: `Type ${prefix}help | Shard ${SHARD_ID}`, type: 0 });
}
