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
  help: cmd_help,
  role: cmd_role
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

function cmd_help(msg, args){
  var helpText = [
    'help - show this Text',
    'say - repeats whatever you type in',
    'ping - try. What do you have to lose? :D',
    'rip - rest in pieces']
  const embed = new MessageEmbed()
    .setTitle('Here is some help')
    .setColor(0xffff00)
    .setDescription(helpText);
    msg.channel.send(embed);
}

//Role manager
function cmd_role(msg, args){
  const myGuild = client.guilds.cache.get('782289316931567627');

  if(args[0] == 'Helfer'){
    const roleHelfer = myGuild.roles.cache.find(role => role.name === 'Helfer');
    console.log(`Found the role ${roleHelfer.name}`);
    msg.member.roles.add(roleHelfer);

  } else if(args[0] == 'Anfänger'){
    const roleAnfaenger = myGuild.roles.cache.find(role => role.name === 'Anfänger');
    console.log(`Found the role ${roleAnfaenger.name}`);
    msg.member.addRole(roleAnfaenger).catch(console.error);

  } else if(args[0] == 'Developer'){
    const roleDeveloper = myGuild.roles.cache.find(role => role.name === 'Developer');
    console.log(`Found the role ${roleDeveloper.name}`);
    msg.member.addRole(roleDeveloper).catch(console.error);

  } else {
    msg.channel.send('This not a role')
  }
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
console.log('running')