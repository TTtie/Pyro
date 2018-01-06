module.exports = function (param, clientArg, args, sounds) {
    try {
        if (param.message.member.getVoiceChannel() != null && args != "" && sounds["Cm_pyro_pregamelostlast_0" + args + ".mp3"]) {
            param.message.member.getVoiceChannel().join(false, false).then(voice => {
                voice.play(sounds.resolveSound("Cm_pyro_pregamelostlast_0" + args + ".mp3"));
                voice.on("end", () => {
                    console.log("Sucessfully played Cm_pyro_pregamelostlast_0" + args + ".mp3");
                    voice.disconnect()
                });

            })
        }
        param.message.channel.sendMessage("*m ph*");
    } catch (err) {
        return err;
    }
}
module.exports.isCmd = true
module.exports.isVoiceLine = true;