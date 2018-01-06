const {Collection} = require("eris")
const fs = require("fs");

/**
 * Loads all the commands.
 * @param {Collection<Function>} coll 
 */
module.exports = function loadCommands(coll) {
    let fa = fs.readdirSync("./assets/cmds");
    for (let i = 0; i < fa.length; i++) {
        let cmF = fa[i];
        if (/.+\.js$/.test(cmF)) {
            let cmN = cmF.match(/(.+)\.js$/)[1]
            try {
                let cmFL = require("../assets/cmds/" + cmN + ".js")
                cmFL.id = cmN;
                if (cmFL.isCmd) {
                    console.log(`${__filename}      | Loading ${cmN} command, file ${cmF}`)
                    coll.add(cmFL);
                }
                else console.log(__filename + "    | Skipping non-command " + cmF)
            } catch (err) {
                console.error(`Error while loading command ${cmN}: ${err}`)
                console.error(err)
            }

        } else {
            console.log(__filename + "     | Skipping non-JS " + cmF)
        }
    }
}