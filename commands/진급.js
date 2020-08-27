const roblox = require('noblox.js');
const chalk = require('chalk');
require('dotenv').config();
const groupId = 4483539;
const maximumRank = 9;

async function getRankName(func_group, func_user){
    let rolename = await roblox.getRankNameInGroup(func_group, func_user);
    return rolename;
}

async function getRankID(func_group, func_user){
    let role = await roblox.getRankInGroup(func_group, func_user);
    return role;
}

async function getRankFromName(func_rankname, func_group){
    let roles = await roblox.getRoles(func_group);
    let role = await roles.find(rank => rank.name == func_rankname);
    if(!role){
        return 'NOT_FOUND';
    }
    return role.rank;
}

exports.run = async (client, message, args) => {
    if(!message.member.roles.cache.some(role =>["Bot access"].includes(role.name))){
        return message.channel.send({embed: {
            color: 16733013,
            description: "이 명령어를 실행할려면 역할이 필요합니다  | 요구 역할 | Bot access",
            author: {
                name: message.author.tag,
                icon_url: message.author.displayAvatarURL()
            }
        }})
    }
    let username = args[0];
    if(!username){
        return message.channel.send({embed: {
            color: 16733013,
            description: "유저 이름을 입력하세요.",
            author: {
                name: message.author.tag,
                icon_url: message.author.displayAvatarURL()
            }
        }});
    }
    let id;
    try {
        id = await roblox.getIdFromUsername(username);
    } catch {
        return message.channel.send({embed: {
            color: 16733013,
            description: `아잇쿠! ${username}는 로블록스에 없는 유저 입니다!`,
            author: {
                name: message.author.tag,
                icon_url: message.author.displayAvatarURL
            }
        }});
    }
    let rankInGroup = await getRankID(Number(groupId), id);
    let rankNameInGroup = await getRankName(Number(groupId), id);
    if(Number(maximumRank) <= rankInGroup || Number(maximumRank) <= rankInGroup + 1){
        return message.channel.send({embed: {
            color: 16733013,
            description: "봇의 권한을 도달했습니다. 참모 장 이상 계급에게 요구 해주세요.",
            author: {
                name: message.author.tag,
                icon_url: message.author.displayAvatarURL()
            }
        }});
    }
    let promoteResponse;
    try {
        promoteResponse = await roblox.promote(Number(groupId), id);
    } catch (err) {
        console.log(chalk.red('에러가 발생했습니다 에러: ' + err));
        return message.channel.send({embed: {
            color: 16733013,
            description: `에러가 발생했습니다 이는 콘솔에 기록되었습니다.`,
            author: {
                name: message.author.tag,
                icon_url: message.author.displayAvatarURL()
            }
        }});
    }
    let newRankName = await getRankName(Number(groupId), id);
    let newRank = await getRankID(Number(groupId), id);
    message.channel.send({embed: {
        color: 9240450,
        description: "계급 변경 완료",
        author: {
        },
        fields: [
            {
              name: `전 계급`,
              value: `${promoteResponse.oldRole.name}`,
              inline: false
            },
            {
                name: `새로운 계급`,
                value: `${promoteResponse.newRole.name}`,
                inline: false
            },
            {
                name: `유저 ID`,
                value: `${id}`,
                inline: false
            },
        ]
    }});
    if(process.env.logchannelid === 'false') return;
    let logchannel = await message.guild.channels.cache.get(process.env.logchannelid);
    logchannel.send({embed: {
        color: 2127726,
        description: `<@${message.author.id}> has promoted ${username} from ${rankNameInGroup} (${rankInGroup}) to ${promoteResponse.newRole.name} (${promoteResponse.newRole.rank}).`,
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
