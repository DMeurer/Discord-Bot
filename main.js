const Discord = require('discord.js')

const fs = require('fs')
const config = JSON.parse(fs.readFileSync('config.json', 'utf8'))

var client = new Discord.Client()

client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}`)
})

//Init finish
//cmdmap Begin

var cmdmap = {
  say: cmd_say,
  test: cmd_test,
  ping: cmd_ping
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


client.on('message', (msg) => {
  var cont = msg.content,
    author = msg.member,
    channel = msg.channel,
    guild = msg.guild
  
  if(author.is != client.user.id && cont.startsWith(config.prefix)){
    var invoke = cont.split(' ')[0].substr(config.prefix.length),
      args = cont.split(' ').slice(1)

    console.log(invoke, args)

    if(invoke in cmdmap){
      cmdmap[invoke](msg, args)
    }
  }
})

client.login(config.token)