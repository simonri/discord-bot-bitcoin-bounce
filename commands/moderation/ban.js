const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { promptMessage } = require("../../functions.js");

module.exports = {
	name: "ban",
	category: "moderation",
	description: "bans the member",
	usage: "<id | mention>",
	run: async (client, message, args) => {
		const logChannel = message.guild.channels.find(c => c.name === "logs") || message.channel;

		if (message.deletable) message.delete();

		if (!args[0]) {
			return message.channel.send("Please provide a person to ban.")
				.then(m => m.delete(5000));
		}

		if (!args[1]) {
			return message.channel.send("Please provide a reason to ban.")
				.then(m => m.delete(5000));
		}

		if (!message.member.hasPermission("BAN_MEMBERS")) {
			return message.channel.send("You do not have permissions to ban members. Please contact a staff member!")
				.then(m => m.delete(5000));
		
		}

		if (!message.guild.me.hasPermission("BAN_MEMBERS")) {
			return message.channel.send("I do not have permissions to ban members.")
				.then(m => m.delete(5000));
		}

		const toBan = message.mentions.members.first() || message.guild.members.get(args[0]);

		if (!toBan) {
			return message.channel.send("Couldn't find that member, try again!")
				.then(m => m.delete(5000));
		}

		if (toBan.id === message.author.id) {
			return message.channel.send("Can't kick yourself...")
				.then(m => m.delete(5000));
		}

		if (!toBan.bannable) {
			return message.channel.send("I can't ban that person due to role hierarchy, I suppose.")
				.then(m => m.delete(5000));
		}
		
		const embed = new RichEmbed()
			.setColor("#ff0000")
			.setThumbnail(toBan.user.displayAvatarURL)
			.setFooter(message.member.displayName, message.author.displayAvatarURL)
			.setTimestamp()
			.setDescription(stripIndents`**> baned member:** ${toBan} (${toBan.id})
			**> baned by:** ${message.member} (${message.member.id})
			**> Reason:** ${args.slice(1).join(" ")}`);

		const promptEmbed = new RichEmbed()
			.setColor("GREEN")
			.setAuthor(`This verification becomes invalid after 30s.`)
			.setDescription(`Do you want to ban ${toBan}?`)

		await message.channel.send(promptEmbed).then(async msg => {
			const emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);

			if (emoji === "✅") {
				msg.delete();

				toBan.ban(args.slice(1).join(" "))
					.catch(err => {
						if (err) return message.channel.send(`Well.... the ban didn't work out. Here's the error ${err}`)
					});

				logChannel.send(embed);
			} else if (emoji === "❌") {
				msg.delete();

				message.reply(`ban canceled.`)
					.then(m => m.delete(10000));
			}
		});
	}
};