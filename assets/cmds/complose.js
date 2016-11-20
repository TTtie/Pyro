module.exports = function(param,clientArg, args) {
    var sliceArgs = args.slice(9)
    console.log(sliceArgs)
    try {
   if(param.message.member.getVoiceChannel() != null && sliceArgs != "") {
param.message.member.getVoiceChannel().join(false,false).then(voice =>{
    var encoder = voice.voiceConnection.createExternalEncoder({type: "ffmpeg", source: "Cm_pyro_pregamelostlast_0"+sliceArgs+".mp3"});
    encoder.once("end", () => {console.log("Sucessfully played Cm_pyro_pregamelostlast_0"+sliceArgs+".mp3");
voice.voiceConnection.disconnect()
});
    var stream = encoder.play()

})
   }
       param.message.channel.sendMessage("*m ph*");
    }catch(err) {
        return err;
    }
}