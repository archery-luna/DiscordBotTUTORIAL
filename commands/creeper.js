const { Message } = require("discord.js")

module.exports = {
    "name" : 'creeper',
    "description" : 'aww man',
    execute(message, args){
        message.channel.send('AWW MAN SO WAY BACK IN THE MINES DIAMOND PICKAXE SWINGING FROM SIDE TO SIDE.');
    }
}