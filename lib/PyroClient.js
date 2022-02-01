"use strict";
const { Client } = require("sosamba");
class PyroClient extends Client {
    constructor(...args) {
        super(...args);
    }
}

module.exports = PyroClient;