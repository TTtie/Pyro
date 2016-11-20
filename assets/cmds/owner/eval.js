module.exports = function(param, clientArg, args) {
      var sliced = args.slice(5);
      console.log(sliced);
try { 
var evaluated = eval(sliced);
console.log(evaluated);
param.message.channel.sendMessage("Input:\n```js\n" + sliced + "```\nOutput:\n```js\n" + evaluated + "\n```")
}catch(err){
console.log("An error occurred while using eval: " + err.message)
}
}