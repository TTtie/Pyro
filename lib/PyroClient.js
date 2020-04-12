"use strict";
const { Client } = require("sosamba");
const workersAsPromised = require("workers-as-promised");
class PyroClient extends Client {
    constructor(...args) {
        super(...args);
        this.IPC = new workersAsPromised();
    }
    listBotColls() {
        return this.guilds.filter(g =>
            g.members.filter(fn => fn.bot).length / g.memberCount * 100
            >= 75);
    }
}

module.exports = PyroClient;