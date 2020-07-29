const Discord = require("discord.js");
const bot = new Discord.Client();
const env = require("dotenv").config();

const request = require("request");
const deepai = require("deepai");
const moment = require("moment");

const API_KEY = process.env.API_KEY;
const DEEP_AI_KEY = process.env.DEEP_AI_KEY;

bot.on("ready", () => {
  console.log(`Logged in as ${bot.user.tag}!`);
});

const PREFIX = "?";
bot.on("message", async (msg) => {
  if (!msg.content.startsWith(PREFIX)) return;

  switch (msg.content) {
    case "?help":
      msg.author.send(
        "Hier komt wat Otter wijsheid!\n\n" +
          "**?help**: Geeft informatie over het gebruik van de Otter-bot! (op het moment alleen de commands)\n" +
          "**?otterdag**: Ehhhhh wanneer is het otterdag dan?!\n" +
          "**?rareotter**: Geeft een otter foto gegenereerd door DeepAi\n" +
          "**?hoeveelotterdagen**: Hoeveel otterdagen zijn er al geweest sinds de launch van Otter-bot?\n" +
          "**?whodis**: Geeft wat info over de gezellige codeurs!\n" +
          "**?otter**: Geeft een mooie otter foto!\n\n" +
          "waar wacht je nog op! ga praten met de otter in het otter kanaal!"
      );
      break;

    case "?otterdag":
      msg.reply("Hoe moet ik dat weten ik ben een otter lol.");
      break;

    case "?rareotter":
      try {
        const url = await getDeepAiOtter();
        msg.reply("Wow deze heb ik nog nooit gezien!", { files: [url] });
      } catch (error) {
        console.log(error);
      }
      break;

    case "?hoeveelotterdagen":
      msg.reply("ehhhhh ongeveer twee uur ofzo.");
      break;

    case "?whodis":
      msg.reply("Ik ben tot leven gewekt door Tijs en Auke!");
      break;

    case "?otter":
      msg.reply("otter pic?", { files: [getOtterPic()] });
      break;
  }
});

//This gets a fresh new otter pic from cutestpaw.com
function getOtterPic() {
  return "http://www.cutestpaw.com/wp-content/uploads/2016/01/Tiny-otter..jpg";
}

async function getDeepAiOtter() {
  deepai.setApiKey(DEEP_AI_KEY);
  resp = await deepai.callStandardApi("text2img", {
    text: "otter",
  });
  return resp.output_url;
}

bot.login(API_KEY);
