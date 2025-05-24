exports.run = async (client, message, args, distube) => {
  let queue = distube.getQueue(message);
  if (!queue) {
    return message.channel.send({ content: "You are not in a voice channel! Please join one and play a song using `;play`! If you think this is an error please report it immediately!" }).catch((O_o) => { });
  }
  try {
    distube.skip(message).catch((O_o) => { });
    message.react('⏩')
  } catch (e) {
    console.log(e);
    return message.channel.send({ content: "The current song is being skipped by " + message.author.username })
  }
  return message.channel.send({ content: "The current song is being skipped by " + message.author.username }).catch((O_o) => { });
}
