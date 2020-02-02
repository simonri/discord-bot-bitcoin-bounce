const {RichEmbed} = require("discord.js");
const arraySort = require("array-sort");
const table = require("table");

module.exports = {
	name: "invites",
	category: "info",
	description: "Returns your invites",
	run: async (bot, message, args) => {
		let invites = await message.guild.fetchInvites();

		invites = invites.array();

		arraySort(invites, "uses", {reverse: true});

		invites = invites.splice(0, 10);

		let possibleInvites = [["User", "Uses"]];
		invites.forEach(invite => {
			possibleInvites.push([invite.inviter.username, invite.uses]);
		});

		const embed = new RichEmbed()
			.setColor("")
			.setTitle("Server Invites")
			.addField("Leaderboard", `\`\`\`${table.table(possibleInvites)}\`\`\``);

		message.channel.send(embed);
	}
};
