const { sendMessage } = require("../../functions.js");

module.exports = {
	name: "mute",
	category: "moderation",
    description: "Mutes the member",
    usage: "<id | mention>",
	run: async (bot, message, args) => {
        if (message.deletable) message.delete();

        if (!message.member.hasPermission("MANAGE_ROLES")) return sendMessage(message, "You don't have permission to use this command.", 5);
		if (!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINSTRATOR"])) return sendMessage(message, "I don't have permissions to add roles!", 5);

        const mute = message.mentions.members.first() || message.guild.members.get(args[0]);
        if (!mute) return sendMessage(message, "Please supply a user to be muted!", 5);

        const reason = args.slice(1).join(" ");
	}
}