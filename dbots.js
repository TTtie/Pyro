"use strict";
const { post } = require("chainfetch");
const { dbotstoken } = require("./config.json");
module.exports = guilds => {
    if (!dbotstoken) return Promise.resolve();
    return post("https://discord.bots.gg/api/v1/bots/242249568794836993/stats")
        .set({
            "Content-Type": "application/json",
            "Authorization": dbotstoken
        }).send({
            guildCount: guilds
        }).toJSON();
};