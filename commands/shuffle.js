exports.run = async (client, message, args, distube) => {
  let queue = distube.getQueue(message);
  if (!queue) {
    return message.channel.send({ content: "You are not in a voice channel! Please join one and play a song using `;play`! If you think this is an error please report it immediately!" }).catch((O_o) => { });
  }
  try {
    distube.shuffle(message);
    message.react('🔀');

  } catch (e) {
    console.log(e);
    const embed = {
        "description": "Seems to get an error here\nPlease report this immediately [here](https://discord.gg/GGdzTyj6a6)",
      };
    return message.channel.send({ embeds: [embed] }).catch((O_o) => { });
  }
  return message.channel.send({ content: "I've shuffled the music for you, hope you like it." });
}
