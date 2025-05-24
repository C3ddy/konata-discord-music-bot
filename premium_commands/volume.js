const database = require('quick.db');
var prefixDB = new database.table('prefixDB');

exports.run = async (client, message, args, distube) => {

  let queue = distube.getQueue(message);
  if (!queue) {
    return message.channel.send({ content: "You are not in a voice channel! Please join one and play a song using `;play`! If you think this is an error please report it immediately!" }).catch((O_o) => { });
  }
  if (!args[0]) {
    return message.channel.send({ content: "You are missing an args agrument! `;volume <number>` !" }).catch((O_o) => { });
  }
  try {
    distube.setVolume(message, parseInt(args[0]))
  } catch (e) {
    return console.log(e);
  }
  return message.channel.send({ content: 'I have set the volume to `' + (args[0]) + '%`!' }).catch((O_o) => { });
}
