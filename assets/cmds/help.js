module.exports = function (param, clientArg, args, sounds) {
    function map() {
        return clientArg.cmds.map(c => `${c.isVoiceLine ? "\\*": ""}${c.id}`)
    }
    param.message.channel.sendMessage({
        embed: {
            author: {
                name: `Pyro Bot help`,
                icon_url: clientArg.user.avatarURL
            },
            description: `All commands with a \\* can be provided with voice line numbers.`,
            fields: [
                {
                    name: "Commands",
                    value: map().join(", ")
                }
            ],
            color: 0xFB524F
        }
    })
}
module.exports.isCmd = true