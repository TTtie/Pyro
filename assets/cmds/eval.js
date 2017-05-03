module.exports = function(param, clientArg, args, sounds) {
if (param.author.id !== "150628341316059136") return;
try { 
var evaluated = eval(sliced);
console.log(evaluated);
param.message.channel.sendMessage("Input:\n```js\n" + sliced + "```\nOutput:\n```js\n" + evaluated + "\n```")
}catch(err){
console.log("An error occurred while using eval: " + err.message)
}
}
module.exports.isCmd = true