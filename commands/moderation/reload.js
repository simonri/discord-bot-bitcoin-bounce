module.exports = {
	name: "reload",
	category: "moderation",
	aliases: ["rl"],
	description: "Reloads a command",
	run: async (bot, message, args) => {
        if (message.author.id != "248843495853391874") return message.channel.send("You're not the bot owner!");
        
        if (!args[0]) return message.channel.send("Please provide a command to reload!");

        const dir = args[0].split("/")[0];
        const file = args[0].split("/")[1];

        try {
            delete require.cache[require.resolve(`../${dir}/${file}.js`)];
            bot.commands.delete(file);

            const pull = require(`../${dir}/${file}.js`);
            bot.commands.set(pull.name, pull);
        } catch(e) {
            return message.channel.send(`Could not reload: \`${args[0]}\`\n${e}`);
        }

        message.channel.send(`The command \`${args[0]}\` has been reloaded`);
	}
}