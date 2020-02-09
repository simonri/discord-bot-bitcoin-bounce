const {RichEmbed} = require("discord.js");
const arraySort = require("array-sort");
const table = require("table");
const axios = require("axios");

const apiKey = process.env.APIKEY;

module.exports = {
	name: "next",
  category: "game",
  aliases: ["countdown", "draw", "time", "timer"],
	description: "Display stats",
	run: async (bot, message, args) => {
    console.log(apiKey);

    const embed = new RichEmbed().setColor("#F58716");

    let data = (await axios.get("https://thndr.games/public/v1/draw/enddate?apiKey=" + apiKey)).data[2];
    if (data.countdown) {
      embed.setTitle("Countdown Until Draw")
        .setDescription(data.countdown);
        
    } else {
      embed.setTitle("Unable to load data!");
    }

		message.channel.send(embed);
	}
};
