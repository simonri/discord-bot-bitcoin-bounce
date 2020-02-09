const { RichEmbed } = require("discord.js");
const arraySort = require("array-sort");
const table = require("table");
const axios = require("axios");

const apiKey = process.env.APIKEY;

module.exports = {
    name: "download",
    category: "game",
    aliases: ["android", "links", "downloads", "ios"],
    description: "Show download links",
    run: async (bot, message, args) => {
        const embed = new RichEmbed()
            .setColor("#F58716")
            .setTitle("Download Links")
            .setDescription("iOS - http://bit.ly/b-apple\nAndroid - http://bit.ly/b-android\nFirebase - http://bit.ly/b-firebase");

        message.channel.send(embed);
    }
};
