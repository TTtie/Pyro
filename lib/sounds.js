const { readdirSync } = require("fs");

const makeEnum = array => {
    const out = {};
    for (const key of array) {
        out[key] = key;
    }
    return out;
}

const soundEnum = makeEnum(readdirSync(`${__dirname}/../sounds`));

soundEnum.resolveSound = sound => `${__dirname}/../sounds/${sound}`;

module.exports = Object.freeze(soundEnum);