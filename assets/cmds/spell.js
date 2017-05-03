module.exports = function(param,clientArg, args, sounds) {
    var sliceArgs = args
    console.log(sliceArgs)
    try {
   if(param.message.member.getVoiceChannel() != null && sliceArgs != ""  && sounds["Pyro_sf13_spell_generic0"+sliceArgs+".wav"]) {
param.message.member.getVoiceChannel().join(false,false).then(voice =>{
    voice.play(sounds.resolveSound("Pyro_sf13_spell_generic0"+sliceArgs+".wav"));
    voice.on("end", () => {console.log("Sucessfully played Pyro_sf13_spell_generic0"+sliceArgs+".wav");
voice.disconnect()
});
    

})
   }
       param.message.channel.sendMessage("*mmmmmph mmmph*");
    }catch(err) {
        return err;
    }
}
module.exports.isCmd = true