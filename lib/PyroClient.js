"use strict";
const { Client } = require("sosamba");
const workersAsPromised = require("workers-as-promised");
class PyroClient extends Client {
    constructor(...args) {
        super(...args);
        this.IPC = new workersAsPromised();
    }
}

module.exports = PyroClient;