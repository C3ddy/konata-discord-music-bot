const database = require('quick.db');

var prefixDB = new database.table('prefixDB')

exports.run = async (client, message, args, distube) => {
    let prefix = prefixDB.get(message.guild.id);

    args = message.content.slice(prefix.length).trim().split(' ')

    if (!message.channel.permissionsFor(client.user).has("ADMINISTRATOR")) {
        const embed = {
            "description": "Seems to get an error here\nThe permissions ADMINISTRATOR isn't enabled!",
        };
        message.author.send({ embeds: [embed] });
        return;
      }
    if(!args[1]){
        return message.channel.send({ content: "The current prefix is `" + prefixDB.get(message.guild.id) + "`"})
    } else {
        prefixDB.set(message.guild.id, args[1])
        return message.channel.send({ content: "You changed the prefix to `" + prefixDB.get(message.guild.id) + "`"})
    }
}
