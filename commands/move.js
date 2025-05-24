const database = require('quick.db');
var prefixDB = new database.table('prefixDB');

exports.run = async (client, message, args, distube) => {
  let prefix = prefixDB.get(message.guild.id);
  
  args = message.content.slice(prefix.length).trim().split(' ')

  let queue = distube.getQueue(message);
  if (!queue) {
    return message.channel.send({ content: "You are not in a voice channel! Please join one and play a song using `;play`! If you think this is an error please report it immediately!" }).catch((O_o) => { });
  }
  try{
  distube.jump(message, parseInt(args[1]))
    .catch(err => message.channel.send({ content: "Invalid song number. Use the command like this: `;move <Queue number>`" }));
    message.react('⏭');
  } catch(e) {
    console.log(e);
    const embed = {
        "description": "Seems to get an error here\nPlease report this immediately [here](https://discord.gg/GGdzTyj6a6)",
      };
    return message.channel.send({ embeds: [embed] }).catch((O_o) => { });
  }
}
