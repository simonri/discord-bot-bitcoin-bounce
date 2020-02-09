const { RichEmbed } = require("discord.js");
const arraySort = require("array-sort");
const table = require("table");
const axios = require("axios");

module.exports = {
  name: "deposit",
  category: "crypto",
  description: "Show download links",
  run: async (bot, message, args) => {
    let address = "36WMAzcp6wXU1tNUB5gkoaCcsaAUcu96gs";

    const embed = new RichEmbed()
      .setColor("#F58716")
      .setTitle("Deposit Bitcoin")
      .setDescription("Deposits need at least 3 confirmations to be credited to your account.")
      .addField("Your deposit address", "`" + address + "`")
      .setThumbnail("https://chart.googleapis.com/chart?cht=qr&chs=300x300&chl=bitcoin:" + address);

    message.channel.send(embed);
  }
};
