const Discord = require("discord.js");
const bot = new Discord.Client();
const env = require("dotenv").config();

const { API_KEY } = env.parsed;

bot.on("ready", () => {
  console.log(`Logged in as ${bot.user.tag}!`);
  bot.channels.cache.get("738040514112258049").send("Otter");
});

bot.on("message", (msg) => {
  if (msg.content === "otter") {
    msg.reply("otter");
  }
});

bot.login(API_KEY);
