module.exports = function(param,clientArg, args, sounds) {
    try {
   if(param.message.member.getVoiceChannel() != null) {
param.message.member.getVoiceChannel().join(false,false).then(voice =>{
    voice.play(sounds.resolveSound("Cm_pyro_pregamewonlast_01.mp3"));
    voice.on("end", () => {console.log("Sucessfully played Cm_pyro_pregamewonlast_01.mp3");
voice.disconnect()
})

})
   }
       param.message.channel.sendMessage("*m mph!*");
    }catch(err) {
        return err;
    }
}
module.exports.isCmd = true