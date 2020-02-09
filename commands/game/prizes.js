const {RichEmbed} = require("discord.js");
const arraySort = require("array-sort");
const table = require("table");
const axios = require("axios");

const apiKey = process.env.APIKEY;

module.exports = {
  name: "prizes",
  aliases: ["prize"],
	category: "game",
	description: "Display prizes",
	run: async (bot, message, args) => {
    console.log(apiKey);

    const embed = new RichEmbed().setColor("#F58716");

    let data = (await axios.get("https://thndr.games/public/v1/draw/prizes?apiKey=" + apiKey)).data;
    if (data) {
        embed.setTitle("Today's Prizes");
      let text = data.map(d => d.sats + " sats" + " - x" + d.count).join("\n");
      embed.setDescription(text)
        
    } else {
      embed.setTitle("Unable to load data!");
    }

		message.channel.send(embed);
	}
};
