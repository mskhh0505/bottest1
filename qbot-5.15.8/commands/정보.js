// Command made by TypicallyShadow
// Any suggestions? Feel free to contact me.
// Feel free to change any of the footers but do not claim that you made this command as it can be completely rude.
const roblox = require("noblox.js");
require('dotenv').config();
const prefix = "!";
const groupId = 3828960;

exports.run = async (client, message, args) => {

  let givenUsername = args[0];
  if (!givenUsername) 
  return message.channel.send({
     embed: {
       color: 13632027,
       description:
          `**You did not provide the \`username\` argument.**\n` +
          `\n` +
          `**Usage:** \`${prefix}getinfo <username>\``,
        author: {
          name: message.author.tag,
          icon_url: message.author.displayAvatarURL()
        },
        footer: {
          text: "qbot | Plugin by TypicallyShadow"
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
                  name: `유저 닉네임`,
                  value: `**[${completeUsername}](https://www.roblox.com/users/${id}/profile)**`,
                  inline: false
                },
                {
                  name: `유저 ID`,
                  value: id,
                  inline: true
                },
                {
                  name: `그룹 계급`,
                  value: `${rankName}`,
                  inline: true
                },
                {
                    name: `계정 일 수`,
                    value: `${info.age}`,
                    inline: false
                }
              ],
              thumbnail: {
                url: `https://assetgame.roblox.com/Thumbs/Avatar.ashx?userid=${id}`
              },              
          footer: {
          text: ""
              }
             }
           });
          })
        })
      })
    }).catch(function(err) {
      return message.channel.send({
        embed: {
          title: `User Invalid`,
          color: 13632027,
          description: `I couldn't find that user, perhaps you gave the wrong username?` + `\n` + `You provided: \`${givenUsername}\``,
        author: {
          name: message.author.tag,
          icon_url: message.author.displayAvatarURL()
        },
        footer: {
          text: ""
        }
      }
    });
   })
  })
};