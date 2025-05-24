const database = require('quick.db');
var prefixDB = new database.table('prefixDB');

exports.run = async (client, message, args, distube) => {
  let prefix = prefixDB.get(message.guild.id);
  
  let queue = distube.getQueue(message);
  if(!queue) {
    return message.channel.send({ content: "You are not in a voice channel! Please join one and play a song using `;play`! If you think this is an error please report it immediately!" }).catch((O_o) => { });
  }
  args = message.content.slice(prefix.length).trim().split(' ');
  try{
    let interger = args[1];
  
    let qlength = (queue.songs).length;
    if(!args[1]) { 
      args[1] = 1;
      interger = 1;
    }
    if(qlength > 51){
      const slicedArray = (queue.songs).slice(((interger - 1) * 51), (interger * 51));
      
      q = slicedArray
      .map((song, i) => `${i === 0 ? 'Playing:' : `${i}.`} ${song.name} - \`${song.formattedDuration}\``)
      .join('\n')
    } else {
      q = queue.songs
      .map((song, i) => `${i === 0 ? 'Playing:' : `${i}.`} ${song.name} - \`${song.formattedDuration}\``)
      .join('\n')
    }

    let numberOfPages = Math.ceil((qlength / 51))

    const embed = {
      "description": `**Server Queue, Page ${args[1]} of ${numberOfPages}**\n\n ${q}`,
      "color": 9152956
    };
    
    return message.channel.send({ embeds: [embed] }).catch((O_o) => { })
    
  } catch(e){
    console.log(e);
    const embed = {
        "description": "Seems to get an error here\nPlease report this immediately [here](https://discord.gg/GGdzTyj6a6)",
      };
    return message.channel.send({ embeds: [embed] }).catch((O_o) => { });
  }
}
