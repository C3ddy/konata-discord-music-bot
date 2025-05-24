exports.run = async (client, message, args, distube) => {
    const embed = {
      "description": "You can vote in the following websites\n\n[Top.gg](https://top.gg/bot/510173952216268801/vote)\n[discordbotlist](https://discordbotlist.com/bots/bait/upvote)",
      "color": 9152956
    };
    message.channel.send({ embeds: [embed] }).catch((O_o) => { });
  }
  