exports.run = async (client, message, args, distube) => {
    const embed = {
      "description": "To donate to support our discord bot click [here](https://www.paypal.com/paypalme/AstatineDiscordBot)",
      "color": 9152956
    };
    message.channel.send({ embeds: [embed] }).catch((O_o) => { });
  }
