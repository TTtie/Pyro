const https = require('https');
const {dbotstoken} = require("./config.json");
module.exports.post = function (guilds, shard, shards) {
    return new Promise((rs, rj) => {
        const options = {
            hostname: 'discord.bots.gg',
            path: '/api/v1/bots/242249568794836993/stats',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': dbotstoken
            }
        };
        const req = https.request(options, res => {
            console.log('Status: ' + res.statusCode);
            res.setEncoding('utf8');
            res.on('data', body => {
                console.log('Body: ' + body);
            });
            res.on("end", () => rs(res.statusCode === 200));
        });
        req.on('error', e => {
            console.log('problem with request: ' + e.message);
            rj(e);
        });
        req.write(JSON.stringify({
            shardId: shard,
            shardCount: shards,
            guildCount: guilds
        }));
        req.end();
    })
}