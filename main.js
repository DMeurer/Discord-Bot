//Some crazy importing stuff over here

const Discord = require('discord.js')

const fs = require('fs')
const config = JSON.parse(fs.readFileSync('config.json', 'utf8'))
const { Client, MessageAttachment } = require('discord.js');

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
  rip: cmd_rip
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
  msg.channel.send(`${message.author},`, attachment);
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

//Logging in the Bot to change the world. Or at least the discord server.

client.login(config.token)