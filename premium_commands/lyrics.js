const lyricsFinder = require("@jeve/lyrics-finder");


exports.run = async (client, message, args, distube) => {
  let queue = distube.getQueue(message);
  if (!queue) {
    return message.channel.send({ content: "You are not in a voice channel! Please join one and play a song using `;play`! If you think this is an error please report it immediately!" }).catch((O_o) => { });
  }
  const q = queue.songs[0].name
  try{
    lyricsFinder.LyricsFinder(q).then((data) => {
      const embed = {
        "description": `**Lyrics for: ${q}**\n\n${data}`,
        "color": 9152956
      };

      return message.channel.send({ embeds: [embed] }).catch((O_o) => { });
    });
  } catch(e){
    return message.channel.send({ content: "No lyrics available! "}).catch((O_o) => { });
  }
}
