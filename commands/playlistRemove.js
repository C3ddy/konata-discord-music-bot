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
    let argsnew = args.slice(1).join(' ');

    if(!(playlistList.get(message.author.id))){
        const embed = {
          "description": "Seems to get an error here\nYou do not have a playlist!",
          "color": 16738665,
        };
        message.channel.send({ embeds: [embed] }).catch((O_o) => { });
        return;
      }
    if(!(argsnew)){
        return message.channel.send({ content: "Please enter a youtube link or a name to delete from your playlist"})
    }

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
        if(ytdl.validateURL(argsnew)) {
  
          const data1 = await ytdl.getInfo(`${argsnew}`);
          let final1 = data1.videoDetails.title;
            
          let array = playlistList.get(message.author.id);
          let array2 = listPlaylist.get(message.author.id);
            for(var i = 0; i < array.length; i++){
                if(array[i] == argsnew){
                    array.splice(i, 1);
                    array2.splice(i, 1)
                    listPlaylist.set(message.author.id, array2);
                    playlistList.set(message.author.id, array);
                    return message.channel.send({ content: "The song `" + final1 + "` has been removed from playlist" }).catch((O_o) => { });
                }
            }
          return message.channel.send({ content: "The song `" + final1 + "` has been added to the playlist" }).catch((O_o) => { });
        }
      } catch(e){
        console.log(e);
        const embed = {
            "description": "Seems to get an error here\nPlease report this immediately [here](https://discord.gg/GGdzTyj6a6)",
          };
        return message.channel.send({ embeds: [embed] }).catch((O_o) => { });
      }
    try{
        for(var i = 0; i < 10; i ++) {
            const res = await ytsr(argsnew).catch(e => {
                return message.channel.send("No results were found!");
            });
            video = res.items.filter(i => i.type === "video")[i];
            if (!video) return message.channel.send("No results were found!");

            const data2 = await ytdl.getInfo(`${argsnew}`);
            let final2 = data2.videoDetails.title;

            let array = playlistList.get(message.author.id)

            for(var i = 0; i < array.length; i++){
                if(array[i] == video.url){
                    array.splice(i, 1);
                    playlistList.set(message.author.id, array);
                    return message.channel.send({ content: "The song `" + final2 + "` has been removed from playlist" }).catch((O_o) => { });
                }
            }
        }
    } catch(e) {
        console.log(e);
        const embed = {
            "description": "Seems to get an error here\nPlease report this immediately [here](https://discord.gg/GGdzTyj6a6)",
          };
        return message.channel.send({ embeds: [embed] }).catch((O_o) => { });
    }


}
