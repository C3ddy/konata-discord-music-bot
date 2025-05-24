exports.run = async(client, message) => {
	const embed = {
		"description": `:ping_pong: ${Math.round(client.ws.ping)}ms`,
		"color": 9152956
	};
	message.channel.send({ embeds: [embed] }).catch((O_o) => { });
}
