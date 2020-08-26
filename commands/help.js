require('dotenv').config();
const prefix = ";";
exports.run = async (client, message, args) => {
    return message.channel.send({embed: {
        color: 7948427,
        description: `**명령어 목록 입니다.**\n`
        + `\`${prefix}help\` - 명령어 목록을 보여줍니다.\n`
        + `\`${prefix}setrank <유저> <랭크 이름/숫자>\` - 유저를 랭크 이름 또는 숫자로 설정합니다.\n`
        + `\`${prefix}clearshout\` - 그룹의 샤우트를 클리어합니다.\n`
        + `\`${prefix}accept-join <user>\` - 그룹요청을 받습니다.\n`
        + `\`${prefix}deny-join <user>\` - 그룹요청을 거절 합니다.`,
        author: {
            name: message.author.tag,
            icon_url: message.author.displayAvatarURL()
        }
    }});
}
