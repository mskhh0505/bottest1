const express = require('express');
const app = express();

app.get('/', (request, response) => {
     response.sendStatus(200);
});

let listener = app.listen(process.env.PORT, () => {
     console.log('Your app is currently listening on port: ' + listener.address().port);
});

const Discord = require('discord.js');
const prefix = "!";
const groupId = 4483539;
const client = new Discord.Client();
const roblox = require('noblox.js');
const chalk = require('chalk');
const figlet = require('figlet');
const token = process.env.token;
const cookie = "_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_C35CAAC690636A15D2224E68EAED0F614AB497108193098FE85A77C0AD306A5A725C37ED6A5D3DE708CB6B1E926D2B8CC786F01160EF1F008F26F5B840A0C892D11C6B6A47DF7EE8619C51053B74BB69EBA0F048B3569ABFEE6E4E63F8F468B325BD4EBC20F4509B1D0CF4B59C62F8E8EC64D53100B0FA6C2C276BBF907EFE9C87F729425678C1BEB56D23E9105FBCF5F73579C035B2A0A58BE3E8AA0AE8CCDCA6BEC95C50418BEE5345D15A7CE4D2D2457DE6F7464F7EB11112DE53CEF2AD55E13ECAE289224D2C42BAE301153FE6BA530FD0051C99FF4E41A2C6235AE15939AC23EEE68A411E1FB552BC21941D2EC7A9DAA4C1F1DE09977A01359EE4EEB5A16FC14D145461BB9E7CA084200BB441B894F91EB1F6354908276AF169867CDA79670B1107";
require('dotenv').config();
const fs = require('fs');

roblox.setCookie(cookie).catch(async err => {
    console.log(chalk.red('Issue with logging in: ' + err));
});

let commandlist = [];

var firstshout = true;
var shout;

async function onShout(){
  let shoutchannel = await client.channels.cache.get(process.env.shoutchannelid);
  if(firstshout == true){
    firstshout = false;
    shout = await roblox.getShout(Number(process.env.groupId));
    setTimeout(onShout, 30000);
  } else {
    setTimeout(onShout, 30000);
    let currentshout = await roblox.getShout(Number(process.env.groupId));
    if(currentshout.body == shout.body) return;
    if(currentshout.body){
      shoutchannel.send({embed: {
        color: 2127726,
        description: currentshout.body,
        author: {
          name: currentshout.poster.username,
          icon_url: `http://www.roblox.com/Thumbs/Avatar.ashx?x=150&y=150&format=png&username=${shout.poster.username}`
        }
      }});
    } else {
      shoutchannel.send({embed: {
        color: 2127726,
          description: '*Shout cleared.*',
            author: {
              name: currentshout.poster.username,
              icon_url: `http://www.roblox.com/Thumbs/Avatar.ashx?x=150&y=150&format=png&username=${shout.poster.username}`
            }
      }});
    }
    shout = currentshout;
  }
}
if(process.env.shoutchannelid !== 'false'){
  setTimeout(onShout, 15000);
}

fs.readdir('./commands/', async (err, files) => {
    if(err){
        return console.log(chalk.red('An error occured when checking the commands folder for commands to load: ' + err));
    }
    files.forEach(async (file) => {
        if(!file.endsWith('.js')) return;
        let commandFile = require(`./commands/${file}`);
        commandlist.push({
            file: commandFile,
            name: file.split('.')[0]
        });
    });
});

client.on('ready', async () => {
  console.log(chalk.yellow(figlet.textSync('qbot', { horizontalLayout: 'full' })));
  console.log(chalk.red(`Bot started!\n---\n`
  + `> Users: ${client.users.cache.size}\n`
  + `> Channels: ${client.channels.cache.size}\n`
  + `> Servers: ${client.guilds.cache.size}`));
  let botstatus = fs.readFileSync('./bot-status.json');
  botstatus = JSON.parse(botstatus);
  if(botstatus.activity == 'false') return;
  if(botstatus.activitytype == 'STREAMING'){
    client.user.setActivity(botstatus.activitytext, {
      type: botstatus.activitytype,
      url: botstatus.activityurl
    });
  } else {
    client.user.setActivity(botstatus.activitytext, {
      type: botstatus.activitytype
    });
  }
});

client.on('message', async (message) => {
    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).split(' ');
    const commandName = args[0].toLowerCase();
    args.shift();
    const command = commandlist.findIndex((cmd) => cmd.name === commandName);
    if(command == -1) return;
    commandlist[command].file.run(client, message, args);
});

client.login(token);
