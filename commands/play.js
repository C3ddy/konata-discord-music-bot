const DisTube = require('distube');

const { SoundCloudPlugin } = require('@distube/soundcloud')
const { SpotifyPlugin } = require("@distube/spotify");
const { YtDlpPlugin } = require('@distube/yt-dlp');

const database = require('quick.db');
var prefixDB = new database.table('prefixDB');

exports.run = async (client, message, args, distube) => {

  let prefix = prefixDB.get(message.guild.id);
  
  args = message.content.slice(prefix.length).trim().split(' ')
  mes = '';
  for(i = 1; i < args.length; i++){
    mes += (" " + args[i])
  }
  args[1] = mes;

  const voiceChannel = message.member.voice.channel;
  if (!voiceChannel) {
    return message.channel.send({ content: "You are not in a voice channel! Please join one and play a song using `;play`! If you think this is an error please report it immediately!" }).catch((O_o) => { });
  }

  if (!voiceChannel.permissionsFor(client.user).has("CONNECT")) {
    const embed = {
        "description": "Seems to get an error here\nThe permissions CONNECT isn't enabled!",
    };
    message.channel.send({ embeds: [embed] }).catch((O_o) => { });
    return;
  }

  if (!voiceChannel.permissionsFor(client.user).has("SPEAK")) {
    const embed = {
        "description": "Seems to get an error here\nThe permissions SPEAK isn't enabled!",
    };
    message.channel.send({ embeds: [embed] }).catch((O_o) => { });
    return;
  }

  try {
    if (!args[1]) {
      const embed = {
          "description": "Seems to get an error here\nTry again but put in a search query",
      };
      return message.channel.send({ embeds: [embed] }).catch((O_o) => { });
    }
    distube.play(message.member.voice.channel, args[1], {
      member: message.member,
      textChannel: message.channel,
      message
    }).catch((O_o) => {
      try{
        message.channel.send({ content: 'An error encountered while playing `song`! Please report this to the developers as soon as you can! Make sure this is not a permissions issue! Check if the bot has access to join and talk inside of a voice channel!' }).catch((O_o) => { });
      } catch(e){
        console.log(e);
      }
    });

  } catch (e) {
    return console.log(e);
  }

}
