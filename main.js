module.exports.runBot = function(shardId, shardCount, token){
var fs = require("fs")
var Discordie = require("discordie");
var Events = Discordie.Events;
var colors = require("colors/safe")
var client = new Discordie({shardId: shardId, shardCount: shardCount});
colors.setTheme({
  info: 'cyan',
  ok: 'green',
  warn: 'yellow',
  debug: 'blue',
  error: 'red'
});
  var prefix = "Pyro-"
client.connect({ token: token });
var streaming = 0;

client.Dispatcher.on(Events.GATEWAY_READY, e => {
  dbots()
  console.log(colors.ok("Connected as: " + client.User.username));
  console.log(colors.info("The bot is currently in " + client.Guilds.length + " servers, with " + client.Users.length + " users."));
  setGame();
  client.autoReconnect.enable();
});
client.Dispatcher.on(Events.MESSAGE_CREATE, e => {
if (e.message.content.startsWith(prefix)) {
  var command = e.message.content.slice(5)
  var commandName = command.split(" ")[0];
  try {var command = require(`./assets/cmds/${commandName}.js`)(e,client, command);}
  catch(err) {
      try{
      if (e.message.author.id == 150628341316059136) {
        var command = require(`./assets/cmds/owner/${commandName}.js`)(e,client, command);
      }
    }catch(err) {
      console.log(err.stack)
    }
  }

}

});
function dbots() {
    //require("./dbots.js").post(shardId, shardCount, client.Guilds.length)
    require("./dbots.js").post(client.Guilds.length)
}
function setGame() {
    var game = {name: "Mmph "+ prefix + "help"};
  client.User.setGame(game);
 }
 client.Dispatcher.on(Events.GUILD_CREATE, gcr =>{
    dbots()
})
 client.Dispatcher.on(Events.GUILD_DELETE, gcr =>{
    dbots()
})
}
