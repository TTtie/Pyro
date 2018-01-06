module.exports = function (param, clientArg, args, sounds) {
    var sliceArgs = args
    console.log(sliceArgs)
    try {
        if (param.message.member.getVoiceChannel() != null && sliceArgs != "" && sounds["Pyro_laughevil0" + sliceArgs + ".wav"]) {
            param.message.member.getVoiceChannel().join(false, false).then(voice => {
                voice.play(sounds.resolveSound("Pyro_autoonfire0" + sliceArgs + ".wav"));
                voice.on("end", () => {
                    console.log("Sucessfully played Pyro_autoonfire0" + sliceArgs + ".wav");
                    voice.disconnect()
                });

            })
        }
        param.message.channel.sendMessage("*mmph!*");
    } catch (err) {
        return err;
    }
}
module.exports.isCmd = true
module.exports.isVoiceLine = true;