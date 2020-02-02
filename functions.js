const { RichEmbed } = require("discord.js");

module.exports = {
	getMember: (bot, message, toFind = "") => {
		toFind = toFind.toLowerCase();

		let target = bot.guilds.first().members.get(toFind);

		if (!target && message.mentions.members) target = message.mentions.members.first();

		if (!target && toFind)
			target = bot.guilds.first().members.find(member => {
				return member.displayName.toLowerCase().includes(toFind) || member.user.tag.toLowerCase().includes(toFind);
			});

		if (!target) target = message.member;

		return target;
	},

	formatDate: date => {
		return new Intl.DateTimeFormat("en-US").format(date);
	},

	promptMessage: async (message, author, time, validReactions) => {
		for (const reaction of validReactions) await message.react(reaction);

		const filter = (reaction, user) => {
			if (!user || user.bot) return false;
			return validReactions.includes(reaction.emoji.name);
		};

		return message.awaitReactions(filter, { max: 1, time: time * 1000 }).then(collected => collected.first().emoji.name);
	},

	sendMessage: async (message, text, time) => {
		return message.channel.send(text).then(m => {
			if (time) m.delete(time * 1000);
		});
	},

	generateEmbed: (title, description) => {
		if (title == "") title = "-";
		if (description == "") description = "-";
		return new RichEmbed()
			.setTitle(title)
			.setColor("#FF5C1F")
			.setDescription(description);
	},
};
