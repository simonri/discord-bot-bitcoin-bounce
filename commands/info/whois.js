const {getMember, formatDate} = require("../../functions.js");
const {RichEmbed} = require("discord.js");

module.exports = {
	name: "whois",
	aliases: ["userinfo", "user", "who"],
	category: "info",
	description: "Returns user information",
	usage: "[username | id | mention]",
	run: async (bot, message, args) => {
		const member = getMember(bot, message, args.join(" "));

		const joined = formatDate(member.joinedAt);
		const roles =
			member.roles
				.filter(r => r.id !== message.guild.id)
				.map(r => r)
				.join(" ") || "None";

		const created = formatDate(member.user.createdAt);

		const embed = new RichEmbed()
			.setFooter(member.displayName, member.user.displayAvatarURL)
			.setThumbnail(member.user.displayAvatarURL)
			.setColor(member.displayHexColor === "#000000" ? "#ffffff" : member.displayHexColor)

			.addField("Display name", member.displayName, true)
			.addField("Username", member.user.username, true)
			.addBlankField(true)
			.addField("Roles", roles, true)
			.addBlankField(true)
			.addBlankField(true)
			.addField("Joined at", joined, true)
			.addField("Created at", created, true)

			.setTimestamp();

		if (member.user.presence.game) embed.addField("Currently playing", member.user.presence.game.name);

		message.channel.send(embed);
	}
};
