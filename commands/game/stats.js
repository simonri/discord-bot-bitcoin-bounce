const {RichEmbed} = require("discord.js");
const arraySort = require("array-sort");
const table = require("table");
const axios = require("axios");

const apiKey = process.env.APIKEY;

module.exports = {
	name: "stats",
  category: "game",
  aliases: ["statistics", "numbers", "tickets"],
	description: "Display stats",
	run: async (bot, message, args) => {
    console.log(apiKey);

    const embed = new RichEmbed().setColor("#F58716")
    

    let data = (await axios.get("https://thndr.games/public/v1/draw/stats?apiKey=" + apiKey)).data[0];
    if (data.totalTickets) {
      embed.setTitle("Statistics")
        .addField("Tickets", data.totalTickets, true)
        .addBlankField(true)
        .addField("Players", data.totalPlayers, true)
        .addField("Ticket Whale", data.maxTickets, true)
        .addBlankField(true)
        .addField("Average Tickets", data.averageTickets, true);
    } else {
      embed.setTitle("Unable to load data!");
    }

		message.channel.send(embed);
	}
};
