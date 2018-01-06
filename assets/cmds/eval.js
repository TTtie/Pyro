module.exports = function (param, clientArg, args, sounds) {
    if (param.author.id !== "150628341316059136") return;
    try {
        var evaluated = eval(args);
        if (typeof evaluated !== "string") evaluated = require("util").inspect(evaluated);
    } catch (err) {
        console.log("An error occurred while using eval: " + err.message)
        var evaluated = err.message;
    }
    param.channel.sendMessage({
        embed: {
            author: {
                name: "Evaluated!"
            },
            description: evaluated,
            color: 0xFB524F
        }
    })
}
module.exports.isCmd = true