const DisTube = require('distube');
const db = require('quick.db');

var playlistList = new db.table('playlistList');
var prefixDB = new db.table('prefixDB');
var Premium1v = new db.table('Premium1');
var Premium2v = new db.table('Premium2');

const { SoundCloudPlugin } = require('@distube/soundcloud')
const { SpotifyPlugin } = require("@distube/spotify");

exports.run = async (client, message, args, distube) => {
  let Premium1 = false;
  let Premium2 = false;
  try{
      Premium1 = Premium1v.get(message.author.id);
      Premium2 = Premium2v.get(message.guild.ownerId)
  } catch (e) {
      console.log(e);
  }

  if(Premium1 || Premium2){
    let prefix = prefixDB.get(message.guild.id);
    
    args = message.content.slice(prefix.length).trim().split(' ')

    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) {
      return message.channel.send({ content: "You are not in a voice channel! Please join one and play a song using `;play`! If you think this is an error please report it immediately!" }).catch((O_o) => { });
    }

    if (!voiceChannel.permissionsFor(client.user).has("CONNECT")) {
      const embed = {
          "description": "Seems to get an error here\nThe permissions CONNECT isn't enabled!",
          "color": 16738665,
      };
      message.channel.send({ embeds: [embed] }).catch((O_o) => { });
      return;
    }

    if (!voiceChannel.permissionsFor(client.user).has("SPEAK")) {
      const embed = {
          "description": "Seems to get an error here\nThe permissions SPEAK isn't enabled!",
          "color": 16738665,
      };
      message.channel.send({ embeds: [embed] }).catch((O_o) => { });
      return;
    }

    if(!(playlistList.get(message.author.id))){
      const embed = {
        "description": "Seems to get an error here\nYou do not have a playlist!",
        "color": 16738665,
      };
      message.channel.send({ embeds: [embed] }).catch((O_o) => { });
      return;
    }
    let array = playlistList.get(message.author.id)

    const playlist = await distube.createCustomPlaylist(array, {
      member: message.member,
      properties: { name: "My playlist name" },
      parallel: true
    });
    try {
      return distube.play(message.member.voice.channel, playlist, {
        member: message.member,
        textChannel: message.channel,
        message
      }).catch((O_o) => {
        message.channel.send({ content: 'An error encountered while playing `song`! Please report this to the developers as soon as you can! Make sure this is not a permissions issue! Check if the bot has access to join and talk inside of a voice channel!' }).catch((O_o) => { });
      });

    } catch (e) {
      return console.log(e);
    }
  } else{
    "You need to have Premium and be in our discord server to use this command";
  }
}
