module.exports.post = function (guilds, shard, shards) {
    return new Promise((rs, rj) => {
        const https = require('https');
        const token = require("./config.json").dbotstoken
        const options = {
            hostname: 'bots.discord.pw',
            path: '/api/bots/242249568794836993/stats',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        };
        const req = https.request(options, res => {
            console.log('Status: ' + res.statusCode);
            res.setEncoding('utf8');
            res.on('data', body => {
                console.log('Body: ' + body);
            });
            res.on("end", () => rs());
        });
        req.on('error', e => {
            console.log('problem with request: ' + e.message);
            rj(e);
        });
        req.write(JSON.stringify({
            shard_id: shard,
            shard_count: shards,
            server_count: guilds
        }));
        req.end();
    })
}