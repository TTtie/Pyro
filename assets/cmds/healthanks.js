module.exports = function(param,clientArg, args) {
    try {
   if(param.message.member.getVoiceChannel() != null) {
param.message.member.getVoiceChannel().join(false,false).then(voice =>{
    var encoder = voice.voiceConnection.createExternalEncoder({type: "ffmpeg", source: "Pyro_thanksfortheheal01.wav"});
    encoder.once("end", () => {console.log("Sucessfully played Pyro_thanksfortheheal01.wav");
voice.voiceConnection.disconnect()
});
    var stream = encoder.play()

})
   }
       param.message.channel.sendMessage("*mmmph mph.*");
    }catch(err) {
        return err;
    }
}