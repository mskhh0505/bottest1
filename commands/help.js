require('dotenv').config();
const prefix = ";";
exports.run = async (client, message, args) => {
    return message.channel.send({embed: {
        color: 7948427,
        description: `**명령어 목록**\n`
        + `\`${prefix}명령어\` - 명령어 사용법과 목록을 보여줍니다.\n`
        + `\`${prefix}수락 <유저>\` - 그룹 가입 요청을 명령어로 통해 받을 수 있습니다.\n`
        + `\`${prefix}진급 <유저>\` - 유저의 7여단 그룹 계급을 진급 시킬 수 있습니다..\n`
        + `\`${prefix}강등 <유저>\` - 유저의 7여단 그룹 계급을 강등 시킬 수 있습니다..\n`
        + `\`${prefix}정보 <유저>\` - 유저의 정보를 확인 할 수 있습니다.`,
        author: {
            name: message.author.tag,
            icon_url: message.author.displayAvatarURL()
        }
    }});
}
