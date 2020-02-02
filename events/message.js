module.exports = async (bot, message) => {
	if (message.author.bot) return;
	if (!message.guild && message.attachments.array().length > 0) return analyzeImage(bot, message);

	if (!message.content.startsWith(bot.prefix)) return bot.levels.newMSG(bot, message);
	if (!message.member && message.guild) message.member = await message.guild.fetchMember(message);

	const args = message.content
		.slice(bot.prefix.length)
		.trim()
		.split(/ +/g);
	const cmd = args.shift().toLowerCase();

	if (cmd.length === 0) return;

	let command = bot.commands.get(cmd);
	if (!command) command = bot.commands.get(bot.aliases.get(cmd));

	if (command) {
		if (!message.guild && !command.allowDM) return message.channel.send("This command is not allowed in DM's!");
		command.run(bot, message, args);
	}
};