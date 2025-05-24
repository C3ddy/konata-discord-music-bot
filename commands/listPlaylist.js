var sqlite3 = require('sqlite3').verbose();
const ytdl = require('ytdl-core-discord');
var db = new sqlite3.Database('./json.sqlite');

const database = require('quick.db');
var playlistList = new database.table('playlistList')
var prefixDB = new database.table('prefixDB')
var listPlaylist = new database.table('l');


exports.run = async (client, message, args, distube) => {
        let prefix = prefixDB.get(message.guild.id);
        
        args = message.content.slice(prefix.length).trim().split(' ')
        if(!args[1]) { 
            args[1] = 1;
          }
        
        let interger = args[1]
        
        let newArray = await listPlaylist.get(message.author.id);

        let numberOfPages = Math.ceil((newArray.length / 25))

        if(!(newArray)){
            const embed = {
              "description": "Seems to get an error here\nYou do not have a playlist!",
              "color": 16738665,
            };
            message.channel.send({ embeds: [embed] }).catch((O_o) => { });
            return;
          }

        try{
            if(newArray.length > 25){
                const slicedArray = newArray.slice(((interger - 1) * 25), (interger * 25));
                q = slicedArray
                .map((v) => `${v}`)
                .join('\n')
            }else {
                q = newArray
                .map((v) => `${v}`)
                .join('\n')
            }

            const embed = {
                "description": `**List of songs in playlist ${message.author.tag} Page, ${args[1]} of ${numberOfPages}**\n\n ${q}`,
                "color": 9152956
            };

            return message.channel.send({ embeds: [embed] }).catch((O_o) => { });
        } catch(e){
            console.log(e);
            const embed = {
                "description": "Seems to get an error here\nPlease report this immediately [here](https://discord.gg/GGdzTyj6a6)",
            };
            return message.channel.send({ embeds: [embed] }).catch((O_o) => { });
                
        }
    }
