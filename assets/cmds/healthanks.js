module.exports = function(param,clientArg, args, sounds) {
    try {
   if(param.message.member.getVoiceChannel() != null) {
param.message.member.getVoiceChannel().join(false,false).then(voice =>{
    voice.play(sounds.resolveSound("Pyro_thanksfortheheal01.wav"));
    voice.on("end", () => {console.log("Sucessfully played Pyro_thanksfortheheal01.wav");
voice.disconnect()
});
    var stream = voice.play()

})
   }
       param.message.channel.sendMessage("*mmmph mph.*");
    }catch(err) {
        return err;
    }
}
module.exports.isCmd = true