var sqlite3 = require('sqlite3').verbose();
const ytdl = require('ytdl-core-discord');
var db = new sqlite3.Database('./json.sqlite');

const database = require('quick.db');
var playlistList = new database.table('playlistList')
var prefixDB = new database.table('prefixDB')



exports.run = async (client, message, args, distube) => {
        let prefix = prefixDB.get(message.guild.id);
        
        args = message.content.slice(prefix.length).trim().split(' ')
        if(!args[1]) { 
            args[1] = 1;
          }
        let interger = args[1];
        if(playlistList.get(message.author.id)){
            var newArray = []
            const array = playlistList.get(message.author.id);
            for(var i = 0; i < array.length; i++){
                    const data1 = await ytdl.getInfo(array[i]);
                    final1 = data1.videoDetails.title;
                    newArray.push(final1);
                }
            
            try{
                client.users.fetch(message.author.id).then(async (user) => {
                    if(newArray.length > 100){
                        const slicedArray = newArray.slice(((interger - 1) * 100), (interger * 100));
                        q = slicedArray
                        .map((v) => `${v}`)
                        .join('\n')
                    }else {
                        q = newArray
                        .map((v) => `${v}`)
                        .join('\n')
                    }
                    let numberOfPages = Math.ceil((newArray.length / 100))
                    const embed = {
                        "description": `**List of songs in playlist ${user.tag} Page, ${args[1]} of ${numberOfPages}**\n\n ${q}`,
                        "color": 9152956
                    };
                    return message.channel.send({ embeds: [embed] }).catch((O_o) => { })

                })
            } catch(e){
                console.log(e);
                const embed = {
                    "description": "Seems to get an error here\nPlease report this immediately [here](https://discord.gg/GGdzTyj6a6)",
                  };
                return message.channel.send({ embeds: [embed] }).catch((O_o) => { });
                
            }
        }

    }
