// Command made by TypicallyShadow
// Any suggestions? Feel free to contact me.
// Feel free to change any of the footers but do not claim that you made this command as it can be completely rude.
const roblox = require("noblox.js");
require('dotenv').config();
const prefix = ";";
const groupId = 3828960;

exports.run = async (client, message, args) => {

  let givenUsername = args[0];
  if (!givenUsername) 
  return message.channel.send({
     embed: {
       color: 13632027,
       description:
          `사용자 이름을 입력 해주세요.` +
          `\n` +
          `양식은 ${prefix}정보 닉네임 입니다.`,
        author: {
          name: message.author.tag,
          icon_url: message.author.displayAvatarURL()
        },
        footer: {
          text: "Seohyun Core V1"
        }
      }
   });
  
   roblox.getIdFromUsername(givenUsername).then(function(id) {
     roblox.getUsernameFromId(id).then(function(completeUsername) {
       roblox.getRankInGroup(Number(groupId), id).then(function(rankSet) {
        roblox.getRankNameInGroup(Number(groupId), id).then(function(rankName) {
          roblox.getPlayerInfo(parseInt(id)).then(function(info) {
    
        message.channel.send({
           embed: {
             description: `유저 정보`,
             color: 8311585,              
           author:{
              },
              fields: [
                {
                  name: `유저 이름`,
                  value: `**[${completeUsername}](https://www.roblox.com/users/${id}/profile)**`,
                  inline: false
                },
                {
                  name: `그룹 계급`,
                  value: `${rankName}`,
                  inline: true
                },
                {
                  name: `유저 ID`,
                  value: `${id}`,
                  inline: true
                },
                {
                    name: `계정 일 수`,
                    value: `${info.age}`,
                    inline: true
                },
                {
                  name: `소개`,
                  value: info.status || '아무것도 없습니다.',
                  inline: true
                },
                {
                  name: `설명`,
                  value: info.blurb || '아무것도없습니다',
                  inline: false
                }
              ],
              thumbnail: {
                url: `https://assetgame.roblox.com/Thumbs/Avatar.ashx?userid=${id}`
              },              
          footer: {
          text: "Seohyun Core V1"
              }
             }
           });
          })
        })
      })
    }).catch(function(err) {
      return message.channel.send({
        embed: {
          title: `오류`,
          color: 13632027,
          description: `${givenUsername}를 찾을 수 없습니다 다시 입력해주세요.`,
        author: {
          name: message.author.tag,
          icon_url: message.author.displayAvatarURL()
        },
        footer: {
          text: "Seohyun Core V1"
        }
      }
    });
   })
  })
};
