exports.run = async (client, message, args, distube) => {
  let queue = distube.getQueue(message);
  if (!queue) {
    return message.channel.send({ content: "You are not in a voice channel! Please join one and play a song using `;play`! If you think this is an error please report it immediately!" }).catch((O_o) => { });
  }
  try {
    let mode = distube.toggleAutoplay(message)
    message.channel.send({ content: "I have set autoplay mode to `" + (mode ? "on" : "off") + "`! When the queue finishes I will search for related songs!" }).catch((O_o) => { });
  } catch (e) {
    console.log(e);
  }
}
