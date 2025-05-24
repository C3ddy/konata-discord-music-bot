const database = require('quick.db');
var prefixDB = new database.table('prefixDB')

exports.run = async (client, message, args, distube) => {
  let prefix = prefixDB.get(message.guild.id); 
  
  args = message.content.slice(prefix.length).trim().split(' ')

  if(!args[1]) {
    let content = "Hey there! Try using `;filter list` to see available filters!"
    message.channel.send({ content: content });
  }
  if (['list'].includes(args[1])) {
    let content = "**Audio Filters**\n\n Here's a list of available audio filters:\n\n```3d, bassboost, echo, karaoke, nightcore, vaporwave, flanger, gate, haas, reverse, surround, mcompand, phaser, tremolo, earwax```"
    message.channel.send({ content: content }).catch((O_o) => { });
  }
  if ([`3d`, `bassboost`, `echo`, `karaoke`, `nightcore`, `vaporwave`, `flanger`, `gate`, `haas`, `reverse`, `surround`, `mcompand`, `phaser`, `tremolo`, `earwax`].includes(args[1])) {
    let queue = distube.getQueue(message);
    if (!queue) {
      return message.channel.send({ content: "You are not in a voice channel! Please join one and play a song using `;play`! If you think this is an error please report it immediately!" }).catch((O_o) => { });
    }
    try {
      let filter = distube.setFilter(message, args[1])
      message.channel.send({ content: "I've turned the following filters `" + (filter || "off") + "` on!" }).catch((O_o) => { });
    } catch (e) {
      return console.log(e);
    }
  }
}
