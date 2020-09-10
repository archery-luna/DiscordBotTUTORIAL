const { execute } = require("./ping");

module.exports = {
    "name" : 'youtube',
    "descriprion" : 'LOL XD YOUTUBE BE LIKE',
    execute(message, args){
        message.channel.send('https://www.youtube.com');
    }
}