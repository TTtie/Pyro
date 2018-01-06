module.exports = function (param, clientArg, args, sounds) {
    try {
        if (param.member.getVoiceChannel() != null && args != "" && sounds["Pyro_battlecry0" + args + ".wav"]) {
            param.member.getVoiceChannel().join().then(voice => {
                voice.play(sounds.resolveSound("Pyro_battlecry0" + args + ".wav"));
                voice.on("end", () => {
                    console.log("Sucessfully played Pyro_battlecry0" + args + ".wav");
                    voice.disconnect()
                });
            })
        }
        param.channel.sendMessage("*mmph*");
    } catch (err) {
        return err;
    }
}
module.exports.isCmd = true
module.exports.isVoiceLine = true;