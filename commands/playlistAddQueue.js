const db = require('quick.db');
var playlistList = new db.table('playlistList')
var prefixDB = new db.table('prefixDB');
var listPlaylist = new db.table('l');

exports.run = async (client, message, args, distube) => {
    let prefix = prefixDB.get(message.guild.id);
    
    args = message.content.slice(prefix.length).trim().split(' ')


    let queue = distube.getQueue(message);
    if (!queue) {
        return message.channel.send({ content: "You are not in a voice channel! Please join one and play a song using ;play! If you think this is an error please report it immediately!" }).catch((O_o) => { });
    }

    try{
        for(var i = 0; i < queue.songs.length; i++){
            playlistList.push(message.author.id, queue.songs[i].url)
            listPlaylist.push(message.author.id, queue.songs[i].name);
        }

        return message.channel.send({ content: "The Songs have been added to Playlist!" }).catch((O_o) => { });
    } catch(e) {
        console.log(e);
        const embed = {
            "description": "Seems to get an error here\nPlease report this immediately [here](https://discord.gg/GGdzTyj6a6)",
          };
        return message.channel.send({ embeds: [embed] }).catch((O_o) => { });
    }
}
