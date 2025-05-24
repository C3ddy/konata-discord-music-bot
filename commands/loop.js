const database = require('quick.db');
var prefixDB = new database.table('prefixDB');

exports.run = async (client, message, args, distube) => {

  let prefix = prefixDB.get(message.guild.id);
  
  args = message.content.slice(prefix.length).trim().split(' ')

  let queue = distube.getQueue(message);
  if (!queue) {
    return message.channel.send({ content: "You are not in a voice channel! Please join one and play a song using `;play`! If you think this is an error please report it immediately!" }).catch((O_o) => { });
  }
  if (!args[1]) {
    return message.channel.send({ content: "You are missing an args agrument! `;loop <0:Disabled, 1:Repeat song, 2:Repeat all queue>` ! Please input it correctly!" }).catch((O_o) => { });
  }
  try {
    var looping = distube.setRepeatMode(message, parseInt(args[1]));
    message.react('🔄');
  } catch (e) {
    return console.log(e);
  }
  //return message.channel.send({ content: "Loop has been set " + (looping ? "`on`" : "`off`") + "! Once the song ends it will be put back in the queue!" }).catch((O_o) => { });
}
