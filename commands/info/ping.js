module.exports = {
	name: "ping",
	category: "info",
	description: "Returns latency and API ping",
	allowDM: true,
	run: async (bot, message, args) => {
		const msg = await message.channel.send(`🏓 Pinging...`);

		msg.edit(`🏓 Pong\nLatency is ${Math.floor(msg.createdAt - message.createdAt)}\nAPI Latency ${Math.round(bot.ping)}ms`);
	}
};
