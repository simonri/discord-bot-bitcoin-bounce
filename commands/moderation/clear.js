module.exports = {
    name: "clear",
    category: "moderation",
    aliases: ["purge", "nuke", "remove"],
    description: "Clears the chat",
    run: async (client, message, args) => {
        if (message.deletable) message.delete();

        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            return message.channel.send("You can't delete messages").then(m => m.delete(5000));
        }

        if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
            return message.channel.send("Yeah... That's not a number? I also can't delete 0 messages.").then(m => m.delete());
        }

        if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
            return message.channel.send("Sorry, I can't delete messages.").then(m => m.delete(5000));
        }

        let deleteAmount;

        if (parseInt(args[0]) > 100) {
            deleteAmount = 100;
        } else {
            deleteAmount = parseInt(args[0]);
        }

        message.channel.bulkDelete(deleteAmount, true)
            .then(deleted => message.channel.send(`I deleted \`${deleted.size}\` messages.`).then(m => m.delete(5000)))
            .catch(err => {});
    }
};