const discord = require('discord.js');

const randompuppy = require('random-puppy');

const { RichEmbed } = require('discord.js');

module.exports = {
    name: 'meme',
    description: 'Scowers the internet for the dankest of memes',
    execute(message, args) {
        const SubReddits = ['Dankmeme', 'meme', 'me_irl'];

        const random = SubReddits[Math.floor(Math.random() * SubReddits.length)];
        const img = randompuppy(random);
        const embed = new RichEmbed()
            .setColor ('RANDOM')
            .setImage (img)
        message.reply(embed);
    }
}