const roblox = require('noblox.js');
const chalk = require('chalk');
const groupId = 4483539;
require('dotenv').config();

exports.run = async (client, message, args) => {
    if(!message.member.roles.cache.some(role =>["Bot access"].includes(role.name))){
        return message.channel.send({embed: {
            color: 16733013,
            description: "권한이 필요합니다, 요구 권한: Bot access",
            author: {
                name: message.author.tag,
                icon_url: message.author.displayAvatarURL()
            }
        }});
    }
  let username = args[0];
  if(!username){
    return message.channel.send({embed: {
      description: '유저 닉네임을 입력해주세요.',
      color: 16733013,
      author: {
        name: message.author.tag,
        icon_url: message.author.displayAvatarURL()
      }
    }});
  }
  let userid;
  try {
    userid = await roblox.getIdFromUsername(username);
  } catch (err) {
    return message.channel.send({embed: {
      description: '이름을 찾을 수 없습니다.',
      color: 16733013,
      author: {
        name: message.author.tag,
        icon_url: message.author.displayAvatarURL()
      }
    }});
  }
  try {
    username = await roblox.getUsernameFromId(userid);
  } catch (err) {
    console.log(chalk.red('오류 발생 오류: ' + err));
    return message.channel.send({embed: {
      description: '에러가 발생하였습니다. 이는 콘솔에 기록되었습니다',
      color: 16733013,
      author: {
        name: message.author.tag,
        icon_url: message.author.displayAvatarURL()
      }
    }});
  }
  let denyJoinRequestResponse;
  try {
    denyJoinRequestResponse = await roblox.handleJoinRequest(Number(groupId), userid, false);
  } catch (err) {
    return message.channel.send({embed: {
      description: '해당 유저의 리퀘스트를 찾을 수 없습니다.',
      color: 16733013,
      author: {
        name: message.author.tag,
        icon_url: message.author.displayAvatarURL()
      }
    }});
  }
  message.channel.send({embed: {
    color: 9240450,
    description: `**성공적!**  ${username}의 리퀘스트를 거부 하였습니다`,
    author: {
      name: message.author.tag,
      icon_url: message.author.displayAvatarURL()
    }
  }});
  if(process.env.logchannelid === 'false') return;
  let logchannel = await message.guild.channels.cache.get(process.env.logchannelid);
  logchannel.send({embed: {
    color: 2127726,
    description: `<@${message.author.id}> has denied ${username}'s join request.`,
    author: {
      name: message.author.tag,
      icon_url: message.author.displayAvatarURL()
    },
    footer: {
      text: 'Action Logs'
    },
    timestamp: new Date(),
    thumbnail: {
      url: `http://www.roblox.com/Thumbs/Avatar.ashx?x=150&y=150&format=png&username=${username}`
    }
  }});
}
