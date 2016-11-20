module.exports = function(param,clientArg, args) {
    var sliceArgs = args.slice(5)
    console.log(sliceArgs)
    try {
   if(param.message.member.getVoiceChannel() != null && sliceArgs != "") {
param.message.member.getVoiceChannel().join(false,false).then(voice =>{
    var encoder = voice.voiceConnection.createExternalEncoder({type: "ffmpeg", source: "Pyro_autoonfire0"+sliceArgs+".wav"});
    encoder.once("end", () => {console.log("Sucessfully played Pyro_autoonfire0"+sliceArgs+".wav");
voice.voiceConnection.disconnect()
});
    var stream = encoder.play()

})
   }
       param.message.channel.sendMessage("*mmph!*");
    }catch(err) {
        return err;
    }
}