const { Client, Collection, RichEmbed } = require("discord.js");
const { config } = require("dotenv");
const fs = require("fs");

const bot = new Client({
	disableEveryone: true
});

bot.commands = new Collection();
bot.aliases = new Collection();

bot.categories = fs.readdirSync("./commands/");
bot.prefix = "!";

config({
	path: __dirname + "/.env"
});

["command", "event"].forEach(handler => {
	bot[handler] = require(`./handler/${handler}`);
	bot[handler].run(bot);
});

bot.login(process.env.TOKEN);
