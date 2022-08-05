import { request } from "undici";
import config from "./lib/config.mjs";

const { dbotstoken } = config;

export default guilds => {
    if (!dbotstoken) return Promise.resolve();

    return request("https://discord.bots.gg/api/v1/bots/242249568794836993/stats", {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "authorization": dbotstoken,
        },
        body: JSON.stringify({
            guildCount: guilds,
        }),
    }).then(res => {
        if (res.statusCode !== 200) {
            return res.body.text().then(data => {
                throw new Error(`Sending the guild count has failed\n${res.statusCode}\nData returned by the API: ${data}`);
            });
        } else {
            return res.body.json();
        }
    });
};
