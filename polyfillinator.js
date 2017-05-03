module.exports = function(msg) {
    msg.channel.sendMessage = msg.channel.createMessage;
    msg.guild = msg.channel.guild
    msg.member.getVoiceChannel = function() {
        return msg.member.voiceState.channelID ? {
            id: msg.member.voiceState.channelID,
            join: function() {
                return new Promise((rs,rj) => msg._client.joinVoiceChannel(msg.member.voiceState.channelID).then(rs).catch(rj))
            }
        } : null
    }
    msg.message = msg;
}