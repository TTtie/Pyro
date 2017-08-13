var fs = require("fs")
var Eris = require("eris");
var colors = require("colors/safe")
const pol = require("./polyfillinator")
const token = require("./config.json").token
const sounds = require("./sounds")
var client = new Eris(token, {
    getAllUsers: true
});

process.on("unhandledRejection", (p, r) => "")
Object.defineProperty(Eris.Guild.prototype, "defaultChannel", {
    get: function () {
        if (this.channels.filter((c) => c.type == 0).length == 0) return null;
        const defaultChannel = this.channels.filter((c) => c.type == 0 && c.permissionsOf(this.shard.client.user.id).has("readMessages")).sort((a, b) => a.position - b.position)[0];
        if (!defaultChannel) return null;
        return this.channels.get(defaultChannel.id);
    },
    set: function() {}
})
let cmds = {};
let loadAll = function () {
    let fa = fs.readdirSync("./assets/cmds");
    for (let i = 0; i < fa.length; i++) {
        let cmF = fa[i];
        if (/.+\.js$/.test(cmF)) {
            let cmN = cmF.match(/(.+)\.js$/)[1]
            try {
                let cmFL = require("./assets/cmds/" + cmN + ".js")
                if (cmFL.isCmd) {
                    console.log(`${__filename}      | Loading ${cmN} command, file ${cmF}`)
                    cmds[cmN.toLowerCase()] = cmFL;
                }
                else console.log(__filename + "    | Skipping non-command " + cmF)
            } catch (err) {
                console.error(`Error while loading command ${cmN}: ${err}`)
                console.error(err)
            }

        } else {
            console.log(__filename + "     | Skipping non-JS " + cmF)
        }
    }
}
function listBotColls() {
    return client.guilds.filter(g => ((g.members.filter(fn => fn.bot).length / g.memberCount) * 100) >= 75)
}
colors.setTheme({
    info: 'cyan',
    ok: 'green',
    warn: 'yellow',
    debug: 'blue',
    error: 'red'
});
var prefix = "Pyro-"
client.connect();

client.on("ready", () => {
    dbots()
    console.log(colors.ok("Connected as: " + client.user.username));
    console.log(colors.info("The bot is currently in " + client.guilds.size + " servers, with " + client.users.size + " users."));
    setGame();
    loadAll()
    listBotColls().forEach(g => g.leave())
});
client.on("messageCreate", msg => {
    if (msg.content.startsWith(prefix)) {
        var command = msg.content.slice(5)
        var commandName = command.split(" ")[0];
        var args = command.slice((commandName.length + 1))
        pol(msg);
        if (cmds[commandName]) {
            try {
                cmds[commandName](msg, client, args, sounds)
            } catch (e) {
                console.error(e)
            }
        }
    }

});
function dbots() {
    require("./dbots.js").post(client.guilds.size)
}
function setGame() {
    var game = { name: "Mmph " + prefix + "help" };
    client.editStatus("online", game);
}
client.on("guildCreate", gcr => {
    if (listBotColls().includes(gcr)) return gcr.leave()
    dbots()
})
client.on("guildDelete", gcr => {
    dbots()
})
