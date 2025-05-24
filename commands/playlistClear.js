const db = require('quick.db');
var prefixDB = new db.table('prefixDB')
var playlistList = new db.table('playlistList')
var listPlaylist = new db.table('l');

exports.run = async (client, message, args, distube) => {
   
   let prefix = prefixDB.get(message.guild.id);

   if(playlistList.get(message.author.id)){
      playlistList.delete(message.author.id);
      listPlaylist.delete(message.author.id);
   } else {
      return message.channel.send({ content: "You do not own a playlist! Try creating one by doing `" + prefix + "playlistAdd <song>`"}).catch((O_o) => { });
   }

   return message.channel.send({ content: "The playlist has been cleared" }).catch((O_o) => { });

}
