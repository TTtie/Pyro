module.exports.post = function(guilds) {
    var https = require('https');
  const token = require("./config.json").dbotstoken
  var options = {
  hostname: 'bots.discord.pw',
  path: '/api/bots/242249568794836993/stats',
  method: 'POST',
  headers: {
      'Content-Type': 'application/json',
      'Authorization': token
  }
};
var req = https.request(options, function(res) {
  console.log('Status: ' + res.statusCode);
 // console.log('Headers: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  res.on('data', function (body) {
    console.log('Body: ' + body);
  });
});
req.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});
// write data to request body
//req.write(`{"shard_id": ${shards}, "shard_count": ${shardcount}, "server_count": ${guilds} }`);
req.write(`{"server_count": ${guilds} }`);
req.end();
}