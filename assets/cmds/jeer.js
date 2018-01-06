module.exports = function (param, clientArg, args, sounds) {
    var sliceArgs = args
    try {
        if (param.message.member.getVoiceChannel() != null && sliceArgs != "" && sounds["Pyro_jeers0" + sliceArgs + ".wav"]) {
            param.message.member.getVoiceChannel().join(false, false).then(voice => {
                voice.play(sounds.resolveSound("Pyro_jeers0" + sliceArgs + ".wav"));
                voice.on("end", () => {
                    console.log("Sucessfully played Pyro_jeers0" + sliceArgs + ".wav");
                    voice.disconnect()
                });


            })
        }
        param.message.channel.sendMessage("*mmmph*");
    } catch (err) {
        return err;
    }
}
module.exports.isCmd = true
module.exports.isVoiceLine = true;