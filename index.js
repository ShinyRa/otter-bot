const Discord = require("discord.js");
const bot = new Discord.Client();
const env = require("dotenv").config();
const schedule = require('node-schedule');
const deepai = require("deepai");

const FULL_DAY = 23;
const FULL_MINUTE = 60;
const API_KEY = process.env.API_KEY;
const DEEP_AI_KEY = process.env.DEEP_AI_KEY;

var isOtterday = false;

bot.on("ready", () => {
  console.log(`Logged in as ${bot.user.tag}!`);
  bot.user.setActivity("Het is geen otterdag...");
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
            "Waar wacht je nog op! ga praten met de otter in het otter kanaal!"
        );
      break;

    case "?otterdag":
        msg.reply(TTOD());
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
        msg.reply("Ehhhhh ongeveer twee uur ofzo.");
      break;

    case "?whodis":
        msg.reply("Ik ben tot leven gewekt door Tijs en Auke!");
      break;

    case "?otter":
        msg.reply("Hier een mooie otter pic!", { files: [getOtterPic()] });
      break;

    case "?otter":
        msg.reply("Hier een mooie otter pic!", { files: [getOtterPic()] });
      break;
  }
});

//To be or not to be otter day. That is the question.
schedule.scheduleJob('30 * * * * *', () => { 
  //for read-ability I have split the assignment of the isOtterday variable and the bound actions into 2 expressions.
  isOtterday ? isOtterday = false : isOtterday = true;
  if(isOtterday){
    bot.user.setActivity("Het is otterdag!", {
      type: "STREAMING",
      url: "https://www.youtube.com/watch?v=OjqyQr1Fa4g"
    });
    bot.channels.cache.get("738031504940335194").send("@everyone Het is Otter dag!") 
  }else{
    bot.user.setActivity("Het is geen otterdag...");
    bot.channels.cache.get("738031504940335194").send("@everyone Otter dag is afgelopen...");
  }
})

//This gets a fresh new otter pic from cutestpaw.com
function getOtterPic() {
  return "http://www.cutestpaw.com/wp-content/uploads/2016/01/Tiny-otter..jpg";
}

//Time Till Otter Day
function TTOD(){
//!!NOTE!! When it reaches a new hour it displays for example 16 hours and 60 minutes. Should be 17 hours.
  if(isOtterday){
    return "Het is al Otter dag!"
  }else{
    let currentHour = new Date().getHours();
    let currentMinute = new Date().getMinutes();
    return "nog maar "+(FULL_DAY - currentHour)+" uur en "+(FULL_MINUTE - currentMinute)+" minuten tot de nieuwe otter dag!";
  }
}

async function getDeepAiOtter() {
  deepai.setApiKey(DEEP_AI_KEY);
  resp = await deepai.callStandardApi("text2img", {
    text: "otter",
  });
  return resp.output_url;
}

bot.login(API_KEY);