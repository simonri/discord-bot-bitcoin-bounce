const {RichEmbed} = require("discord.js");
const {stripIndents} = require("common-tags");
const {promptMessage} = require("../../functions.js");

module.exports = {
	name: "kick",
	category: "moderation",
	description: "Kicks the member",
	usage: "<id | mention>",
	run: async (client, message, args) => {
		const logChannel = message.guild.channels.find(c => c.name === "logs") || message.channel;

		if (message.deletable) message.delete();

		if (!args[0]) return message.channel.send("Please provide a person to kick.").then(m => m.delete(5000));
		if (!args[1]) return message.channel.send("Please provide a reason to kick.").then(m => m.delete(5000));

		if (!message.member.hasPermission("KICK_MEMBERS"))
			return message.channel.send("You don't have permission to use this command.").then(m => m.delete(5000));
		if (!message.guild.me.hasPermission("KICK_MEMBERS"))
			return message.channel.send("I don't have permissions to kick members.").then(m => m.delete(5000));

		const toKick = message.mentions.members.first() || message.guild.members.get(args[0]);

		if (!toKick) {
			return message.channel.send("Couldn't find that member, try again!").then(m => m.delete(5000));
		}

		if (message.author.id === toKick.id) {
			return message.channel.send("Can't kick yourself...").then(m => m.delete(5000));
		}

		if (!toKick.kickable) {
			return message.channel.send("I can't kick that person due to role hierachy, I suppose.").then(m => m.delete(5000));
		}

		const embed = new RichEmbed()
			.setColor("ff0000")
			.setThumbnail(toKick.user.displayAvaratURL)
			.setFooter(message.member.displayName, message.author.displayAvaratURL)
			.setTimestamp().setDescription(stripIndents`**> Kicked member:** ${toKick} (${toKick.id})
			**> Kicked by** ${message.author} (${message.author.id})
			**> Reason** ${args.slice(1).join(" ")}`);

		const promptEmbed = new RichEmbed()
			.setColor("GREEN")
			.setAuthor("This verification becomes invalid after 30s")
			.setDescription(`Do you want to kick ${toKick}?`);

		message.channel.send(promptEmbed).then(async msg => {
			const emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);

			if (emoji === "✅") {
				msg.delete();

				toKick.kick(args.slice(1).join(" ")).catch(err => {
					if (err) return message.channel.send(`Well... Something went wrong?`);
				});

				logChannel.send(embed);
			} else if (emoji === "❌") {
				msg.delete();

				message.channel.send("Kicked canceled...").then(m => m.delete(5000));
			}
		});
	}
};
