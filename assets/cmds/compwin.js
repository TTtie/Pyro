module.exports = function(param,clientArg, args) {
    try {
   if(param.message.member.getVoiceChannel() != null) {
param.message.member.getVoiceChannel().join(false,false).then(voice =>{
    var encoder = voice.voiceConnection.createExternalEncoder({type: "ffmpeg", source: "Cm_pyro_pregamewonlast_01.mp3"});
    encoder.once("end", () => {console.log("Sucessfully played Cm_pyro_pregamewonlast_01.mp3");
voice.voiceConnection.disconnect()
});
    var stream = encoder.play()

})
   }
       param.message.channel.sendMessage("*m mph!*");
    }catch(err) {
        return err;
    }
}