const Discord = require("discord.js");
const client = new Discord.Client();
const env = require("dotenv").config();

const { API_KEY } = env.parsed;

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", (msg) => {
  if (msg.content === "otter") {
    msg.reply("otter");
  }
});

client.login(API_KEY);
