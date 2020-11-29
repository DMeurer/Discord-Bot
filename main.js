//Some crazy importing stuff over here

const Discord = require('discord.js')

const fs = require('fs')
const config = JSON.parse(fs.readFileSync('config.json', 'utf8'))
const { ClientMA, MessageAttachment } = require('discord.js');
const { ClientME, MessageEmbed } = require('discord.js');

var client = new Discord.Client()

//Init finish

//am I online?

client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}`)
})

//nailed it

//cmdmap Begin

var cmdmap = {
  say: cmd_say,
  test: cmd_test,
  ping: cmd_ping,
  rip: cmd_rip,
  embed: cmd_embed,
  help: cmd_help
}

//functions for the comands

function cmd_say(msg, args){
  msg.channel.send(args.join(' '))
}

function cmd_test(msg, args){
  console.log('Its Working')
}

function cmd_ping(msg, args){
  msg.channel.send('pong')
}

function cmd_rip(msg, args){
  const attachment = new MessageAttachment('https://i.imgur.com/w3duR07.png');
  msg.channel.send(`${msg.author},`, attachment);
}

function cmd_embed(msg, args){
  const embed = new MessageEmbed()
    // Set the title of the field
    .setTitle(args[0])
    // Set the color of the embed
    .setColor(0xff0000)
    // Set the main content of the embed
    .setDescription(args);
    // Send the embed to the same channel as the message
    msg.channel.send(embed);
}

funktion cmd_help(msg, args){
  const embed = new MessageEmbed()
    .setTitle('Here is some help')
    .setColor(0xffff00)
    .setDescription(
      'help - show this Text',
      'say - repeats whatever you type in',
      'ping - try. What do you have to lose? :D',
      'rip - you are RIP'
    );
    msg.channel.send(embed);
}


//Botcommands set. Lets go!

//He reads the messages to filter commands for the bot

client.on('message', (msg) => {
  var cont = msg.content,
    author = msg.member,
    channel = msg.channel,
    guild = msg.guild
  
  //filter messages. Look on the prefix and dont reply to onw messages
  if(author.is != client.user.id && cont.startsWith(config.prefix)){
    //splitting the message in invoke and args without the prefix
    var invoke = cont.split(' ')[0].substr(config.prefix.length),
      args = cont.split(' ').slice(1)

    //console output of the invoke and the args
    console.log(invoke, args)

    //giving output:
    if(invoke in cmdmap){
      //activate script for the command
      cmdmap[invoke](msg, args)
    } else {
      //there is no such command? Thats a shame
      msg.channel.send(invoke + ' is not a command')
    }
  }
})

//Welcome notification
client.on('guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.cache.find(ch => ch.name === 'member-log');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`Welcome to the server, ${member}`);
});

//Logging in the Bot to change the world. Or at least the discord server.

client.login(config.token)