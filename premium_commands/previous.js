exports.run = async (client, message, args, distube) => {
  let queue = distube.getQueue(message);
  if (!queue) {
    return message.channel.send({ content: "You are not in a voice channel! Please join one and play a song using `;play`! If you think this is an error please report it immediately!" }).catch((O_o) => { });
  }
  const song = queue.previous()
  const embed = {
    "title": `${song.name}`,
    "url": `${song.url}`,
    "color": 9152956,
    "thumbnail": {
      "url": `${song.thumbnail}`
    },
    "author": {
      "name": "Now Playing",
      "url": "https://discordapp.com",
      "icon_url": client.user.avatarURL()
    },
    "fields": [
      {
        "name": "Views Amount",
        "value": `${song.views}`,
        "inline": true
      },
      {
        "name": "Song Duration",
        "value": `${song.formattedDuration}`,
        "inline": true
      },
      {
        "name": "Requested By",
        "value": `${song.user}`,
        "inline": true
      }
    ]
  };
  message.channel.send({ embeds: [embed] }).catch((O_o) => { });
}
