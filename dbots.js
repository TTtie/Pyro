"use strict";
const { request } = require("undici");
const { dbotstoken } = require("./config.json");
module.exports = guilds => {
    if (!dbotstoken) return Promise.resolve();

    return request("https://discord.bots.gg/api/v1/bots/242249568794836993/stats", {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "authorization": dbotstoken
        },
        body: JSON.stringify({
            guildCount: guilds
        })
    }).then(res => {
        if (res.statusCode !== 200) {
            throw new Error("Sending the guild count has failed");
        } else {
            return res.body.json();
        }
    });
};