const db = require('quick.db');
const ytdl = require('ytdl-core');
const ytsr = require('ytsr');
const spdl = require('spdl-core').default;

var playlistList = new db.table('playlistList')
var prefixDB = new db.table('prefixDB');
var listPlaylist = new db.table('l');

exports.run = async (client, message, args, distube) => {
    let prefix = prefixDB.get(message.guild.id);
    
    args = message.content.slice(prefix.length).trim().split(' ')
    mes = '';
    for(i = 1; i < args.length; i++){
      mes += (" " + args[i])
    }
    args[1] = mes;
    if (!args[1]){
        return message.channel.send({ content: "No Song has been Inputed!" }).catch((O_o) => { });
    }
    
    let argsnew = args.slice(1).join(' ');

    try{
      if(spdl.validateURL(args[1])){
        return message.channel.send({ content: "We currently do not support spotify in this command. Try adding the song via `" + prefix + "playlistAddQueue`" })
      }
    } catch(e){
      console.log(e);
      const embed = {
          "description": "Seems to get an error here\nPlease report this immediately [here](https://discord.gg/GGdzTyj6a6)",
        };
      return message.channel.send({ embeds: [embed] }).catch((O_o) => { });
    }

    try{
      if(ytdl.validateURL(args[1])) {
        playlistList.push(message.author.id, args[1]);

        const data1 = await ytdl.getInfo(args[1]);
        listPlaylist.push(message.author.id, (data1.videoDetails.title));
        return message.channel.send({ content: "The song `" + data1.videoDetails.title + "` has been added to the playlist" }).catch((O_o) => { });
      }
    } catch(e){
      console.log(e);
      const embed = {
          "description": "Seems to get an error here\nPlease report this immediately [here](https://discord.gg/GGdzTyj6a6)",
        };
      return message.channel.send({ embeds: [embed] }).catch((O_o) => { });
    }

    try {    
        const res = await ytsr(argsnew).catch(e => {
            return message.channel.send("No results were found!");
        });

        video = res.items.filter(i => i.type === "video")[0];
        playlistList.push(message.author.id, video.url)

        const data2 = await ytdl.getInfo(`${video.url}`);
        let final2 = data2.videoDetails.title;
        listPlaylist.push(message.author.id, (final2));
        return message.channel.send({ content: "The song `" + final2 + "` has been added to the playlist" }).catch((O_o) => { });
      } catch (e) {
        console.log(e);
      }
}
