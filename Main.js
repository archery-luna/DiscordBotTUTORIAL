const Discord = require('discord.js');

const Random = require('random');

const client = new Discord.Client();

var Servers = {};

const prefix = '!';
 
const fs = require('fs');

const jsonfile = require('jsonfile');

const { execute } = require('./commands/ping');
const { error } = require('console');

var stats = {};

if(fs.existsSync('stats.json')) {
    stats = jsonfile.readFileSync('stats.json');
}

client.commands = new Discord.Collection();
 
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
 
    client.commands.set(command.name, command);
}
 
 
client.once('ready', () => {
    console.log('WE ONLINE BOIS!');
});

client.on('message', message =>{

    if(message.author.bot) return;

  
  if(message.guild.id in stats === false){
    stats[message.guild.id] = {};
}

const guildstats = stats[message.guild.id];
if(message.author.id in guildstats === false){
    guildstats[message.author.id] = {
        xp: 0,
        level: 0,
        last_message: 0,
    };
}

const userstats = guildstats[message.author.id];
if(Date.now() - userstats.last_message > 60000) {
userstats.xp += Random.int(15, 25);
userstats.last_message = Date.now();

const xptonextlevel = 5 * Math.pow(userstats.level, 2) + 50 * userstats.level + 100;

jsonfile.writeFileSync('stats.json', stats);

if(userstats.xp >= xptonextlevel) {
    userstats.level++;
    userstats.xp - userstats.xp - xptonextlevel;
    message.channel.send(message.author.username + ' Has reached level ' + userstats.level);
}
}

if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'ping'){
        client.commands.get('ping').execute(message, args);
    }
    else if(command === 'Yes'){
        client.commands.get('yes').execute(message, args);
    }
    else if(command === 'youtube'){
        client.commands.get('youtube').execute(message, args);
    }
    else if(command === 'creeper'){
        client.commands.get('creeper').execute(message, args);
    }
    else if(command === 'r_u_online'){
        client.commands.get('online').execute(message, args);
    }
    else if(command === 'ban'){
        const { member, mentions } = message
 
        if(
            member.hasPermission('ADMINISTRATOR') ||
            member.hasPermission('BAN_MEMBERS')
        ) {
            const target = mentions.users.first()
            if(target){
                const targetMember = message.guild.members.cache.get(target.id)
                targetMember.ban()
                message.reply('The user got smashed by the ban hammer')
            } else{
                message.reply('pls do $ban @user');
            }
        } else{
            message.reply('you dont have permisions to run this command')
        }
    }
  
    

    else if (command === 'reactrole'){
        
    }
    else if(command === 'verify'){
        client.commands.get('verify').execute(message, args);
    }
    else if(command === 'kick'){
        const { member, mentions } = message
 
        if(
            member.hasPermission('ADMINISTRATOR') ||
            member.hasPermission('KICK_MEMBERS')
        ) {
            const target = mentions.users.first()
            if(target){
                const targetMember = message.guild.members.cache.get(target.id)
                targetMember.kick()
                message.reply('The user got **BOOTED** out of the server')
            } else{
                message.reply('pls do $kick @user');
            }
        } else{
            message.reply('you dont have permisions to run this command')
        }
        
    }
    else if(command === 'rank'){
        message.reply('Your level is ' + userstats.level);
        message.reply('Your xp is ' + userstats.xp);
        message.reply('this is tempory untill i can figure out how to make rank cards');
    }
    else if(command === 'sl'){
        userstats.level++;
        message.reply('gg your now level ' + userstats.level + ' but by cheating now thats low');
    }
    else{
        message.reply('Sorry lad that is not a command.')
    }
});   

client.login('');