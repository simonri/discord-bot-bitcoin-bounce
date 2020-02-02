const {RichEmbed} = require("discord.js");

module.exports = async (bot, member) => {
	member.addRoles(["638515298756198400", "648624077015351297"]);

	const embed = new RichEmbed()
		.setTitle("Welcome to: Hypixel Skyblock Bugs!")
		.setDescription("Please reply with a screenshot of your unlocked collections and an in game chat message.")
		.addField("How?", "Type `!example` to see an example of a valid verification screenshot.")
		.addField("Why?", "This is to protect our server from unauthorized persons.")
		.setColor("#FF5C1F");

	member.send(embed);
};
