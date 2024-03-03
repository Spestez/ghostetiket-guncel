const { Client, EmbedBuilder, PermissionFlagsBits,PermissionsBitField } = require("discord.js");
const db = require('../db')
const {AdvancedEmbed, AdvancedEmbedType} = require('utilscord')
module.exports = {
  name: "ping",
  description: `Bot sana ping değerlerini gösterir.`,
  type: 1,
  options: [],

  run: async(client, interaction) => {
    

    const embed = new AdvancedEmbed()
    .setDescription(`> Ping değerleri: ${client.ws.ping}ms`)
    interaction.reply({embeds:[embed]})

  }
}; 