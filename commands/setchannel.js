const db = require('quick.db');

var prefixDB = new db.table('prefixDB')
var LimitChannel = new db.table('LimitChannel')

exports.run = async (client, message, args, distube) => {
    if (!message.channel.permissionsFor(client.user).has("ADMINISTRATOR")) {
        const embed = {
            "description": "User must have Admin to perform this command",
        };
        message.author.send({ embeds: [embed] });
        return;
    } else {
        if(LimitChannel.get(message.guild.id)){
            if(LimitChannel.get(message.guild.id) == (message.channel.id)){
                LimitChannel.set(message.guild.id, -1);
                const embed = {
                    "description": "Command performed succesfully",
                  };
                message.channel.send({ embeds: [embed] });
                return;
            }
        }
        LimitChannel.set(message.guild.id, message.channel.id);
        const embed = {
          "description": "Command performed succesfully",
        };
        message.channel.send({ embeds: [embed] });
        return;
    }
  }
  