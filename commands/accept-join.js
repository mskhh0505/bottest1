const roblox = require('noblox.js');
const chalk = require('chalk');
const groupId = 4483539;
require('dotenv').config();

exports.run = async (client, message, args) => {
    if(!message.member.roles.cache.some(role =>["Bot access"].includes(role.name))){
        return message.channel.send({embed: {
            color: 16733013,
            description: "당신은 Bot access 권한이 필요 합니다.",
            author: {
                name: message.author.tag,
                icon_url: message.author.displayAvatarURL()
            }
        }});
    }
  let username = args[0];
  if(!username){
    return message.channel.send({embed: {
      description: '유저 이름을 입력해주세요.',
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
      description: '유저를 찾을 수 없습니다,',
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
    console.log(chalk.red('에러가 발생했습니다 에러: ' + err));
    return message.channel.send({embed: {
      description: '에러가 발생 하였습니다, 이는 콘솔에 기록되었습니다.',
      color: 16733013,
      author: {
        name: message.author.tag,
        icon_url: message.author.displayAvatarURL()
      }
    }});
  }
  let acceptJoinRequestResponse;
  try {
    acceptJoinRequestResponse = await roblox.handleJoinRequest(Number(groupId), userid, true);
  } catch (err) {
    return message.channel.send({embed: {
      description: '그룹요청이 없습니다.',
      color: 16733013,
      author: {
        name: message.author.tag,
        icon_url: message.author.displayAvatarURL()
      }
    }});
  }
  message.channel.send({embed: {
    color: 9240450,
    description: `**성공적!**  ${username}의 그룹요청을 수락하였습니다.`,
    author: {
      name: message.author.tag,
      icon_url: message.author.displayAvatarURL()
    }
  }});
  if(process.env.logchannelid === 'false') return;
  let logchannel = await message.guild.channels.cache.get(process.env.logchannelid);
  logchannel.send({embed: {
    color: 2127726,
    description: `<@${message.author.id}> has accepted ${username}'s join request.`,
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
