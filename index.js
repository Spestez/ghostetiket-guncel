const { Client, GatewayIntentBits, Partials, userMention } = require("discord.js");
const INTENTS = Object.values(GatewayIntentBits);
const PARTIALS = Object.values(Partials);
const Discord = require("discord.js")

const client = new Client({
    intents: INTENTS,
    allowedMentions: {
        parse: ["users"]
    },
    partials: PARTIALS,
    retryLimit: 3
});

function sendGhostPing(channel, member) {
  const ch = client.channels.cache.get(channel)
  ch.send(`${userMention(member.user.id)}`).then(msg=>{msg.delete()})
 }

global.client = client;
client.commands = (global.commands = []);

const { readdirSync } = require("fs")
const config = require("./config.json");
readdirSync('./komutlar').forEach(f => {
  if(!f.endsWith(".js")) return;

 const props = require(`./komutlar/${f}`);

 client.commands.push({
       name: props.name.toLowerCase(),
       description: props.description,
       options: props.options,
       dm_permission: props.dm_permission,
       type: 1
 });

console.log(`${props.name} Başarıyla yüklendi`)

});
readdirSync('./eventler').forEach(e => {

  const eve = require(`./eventler/${e}`);
  const name = e.split(".")[0];

  client.on(name, (...args) => {
            eve(client, ...args)
        });
});

const { ChannelType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

client.login(config.Token || process.env.token)

client.on("guildMemberAdd", member => {
  if(member.bot) return;
  if(member.guild.id !== config.sunucuId) return;
  
  sendGhostPing(config.kanalId, member)
} )