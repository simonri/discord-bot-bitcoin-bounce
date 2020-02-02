const {RichEmbed} = require("discord.js");
const {stripIndents} = require("common-tags");

module.exports = {
	name: "rank",
	aliases: ["level"],
	category: "levels",
	description: "Your rank!",
	usage: "[command | alias]",
	run: async (bot, message, args) => {
		if (!bot.levels.data.hasOwnProperty(message.author.id)) return;

		let user;
		if (message.mentions.members.size > 0) {
			user = message.mentions.members.first();
		} else {
			user = message.member;
		}

		let data = bot.levels.data[user.id] || {
			userLV: "no data",
			userXP: "no data"
		};

		const embed = new RichEmbed()
			.setTitle(user.displayName)
			.setDescription(`**Level:** ${data.userLV} \n**Exp:** ${data.userXP}`)
			.setColor("RANDOM")
			.setThumbnail(user.user.displayAvatarURL);

		message.channel.send(embed);
	}
};
