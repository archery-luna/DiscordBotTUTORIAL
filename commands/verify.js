const { GuildMemberManager } = require("discord.js");

module.exports = {
    name : 'verify',
    description : 'join',
    execute(message, args){

        if(message.member.roles.cache.has('748247397557076098')){
            message.channel.send("you are already in the server!");
        }
        else{
            message.member.roles.add('748247397557076098').cache(console.error);
        }
    }
}