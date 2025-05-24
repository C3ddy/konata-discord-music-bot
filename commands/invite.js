exports.run = async (client, message, args, distube) => {
  try{
    const embed = {
      "description": "You can invite me by [clicking here](https://discord.com/oauth2/authorize?client_id=" + client.user.id + "&scope=bot&permissions=274931608576)",
      "color": 9152956
    };
    message.channel.send({ embeds: [embed] });
  } catch(e){
    console.log(e);
  }
}
