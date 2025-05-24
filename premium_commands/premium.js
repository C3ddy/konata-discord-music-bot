exports.run = async (client, message, args, distube) => {
    const embed = {
      "description": "To Purchase premium click [here](https://www.patreon.com/baitpremium?fan_landing=true)",
      "color": 9152956
    };
    message.channel.send({ embeds: [embed] }).catch((O_o) => { });
  }
