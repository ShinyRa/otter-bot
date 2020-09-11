import { Client } from "discord.js";
import { version } from "../package.json";
import DotenvParser from "./utils/DotenvParser";
import axios from "axios";
import { OtterLogger } from "./utils/logger/OtterLogger";
import { ActivityStatusEnum } from "./utils/logger/activity/ActivityStatusEnum";

export default class OtterBot {
  logger: OtterLogger;

  client: Client;
  FULL_DAY: number = 23;
  FULL_MINUTE: number = 60;

  isOtterday: boolean = false;
  dotenvParser: DotenvParser;

  PREFIX: string = "?";

  constructor(logger: OtterLogger) {
    this.logger = logger;
    this.dotenvParser = new DotenvParser();
    this.client = new Client();

    this.client
      .login(this.dotenvParser.get("API_KEY"))
      .catch((err) => {
        this.logger.report(err.message, ActivityStatusEnum.ERROR);
        this.logger.report(
          `Unable to log in with key ${this.dotenvParser.get("API_KEY")}`,
          ActivityStatusEnum.ERROR
        );
      })
      .finally(() => {
        this.listenForCommands();
        this.client.user?.setActivity(
          `[${version}] in ${process.env.NODE_ENV} environment!`
        );
      });

    this.client.on("ready", () => {
      this.logger.report(`Logged in as ${this.client.user?.tag}!`);
    });

    this.client.on("error", (err) => {
      this.logger.report(err.message, ActivityStatusEnum.ERROR);
    });
  }

  listenForCommands() {
    this.client.on("message", async (msg) => {
      if (!msg.content.startsWith(this.PREFIX)) return;

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
          msg.reply(this.TTOD());
          break;

        // case "?rareotter":
        //   try {
        //     const url = await this.getDeepAiOtter();
        //     msg.reply("Wow deze heb ik nog nooit gezien!", { files: [url] });
        //   } catch (error) {
        //     console.log(error);
        //   }
        //   break;

        case "?rareotter":
          msg.reply("Dit commando doet het eventjes niet 😢");
          break;

        case "?hoeveelotterdagen":
          msg.reply(this.upTimeBot());
          break;

        case "?whodis":
          msg.reply("Ik ben tot leven gewekt door Tijs en Auke!");
          break;

        case "?otter":
          try {
            const url = await this.getOtterPic();
            msg.reply("Hier, een mooie otter pic!", { files: [url] });
          } catch (error) {
            console.log(error);
          }
          break;
      }
    });
  }

  /**
   * This gets a fresh new otter pic from cutestpaw.com
   */
  async getOtterPic() {
    try {
      let randompage = Math.floor(Math.random() * 10) + 1;
      const response = await axios.get(
        `https://pixabay.com/api/?key=${this.dotenvParser.get(
          "PIXABAY_KEY"
        )}&q=otter&image_type=photo&per_page=20&page=` +
          randompage +
          ""
      );
      let randomPicture = Math.floor(Math.random() * response.data.hits.length);
      return response.data.hits[randomPicture].webformatURL;
    } catch (error) {
      console.error(error);
    }
  }

  logout() {
    this.client.destroy();
  }

  /**
   * Time Till Otter Day
   */
  TTOD() {
    //!!NOTE!! When it reaches a new hour it displays for example 16 hours and 60 minutes. Should be 17 hours.
    if (this.isOtterday) {
      return "Het is al Otter dag!";
    } else {
      let currentHour = new Date().getHours();
      let currentMinute = new Date().getMinutes();
      return (
        "nog maar " +
        (this.FULL_DAY - currentHour) +
        " uur en " +
        (this.FULL_MINUTE - currentMinute) +
        " minuten tot de nieuwe otter dag!"
      );
    }
  }

  /**
   * Gets the amount of time this server is currently running
   */
  upTimeBot() {
    let totalSeconds = this.client.uptime || 0 / 1000;
    let days = Math.floor(totalSeconds / 86400);
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);
    return `Deze otter is al ${days} dagen, ${hours} uur, ${minutes} minuten en ${seconds} seconden aan het werk!`;
  }

  //   /**
  //    * Generates a otter via the DeepAI algorithm
  //    */
  //   async getDeepAiOtter() {
  //     deepai.setApiKey(this.dotenvParser.get("DEEP_AI_KEY"));
  //     const resp = await deepai.callStandardApi("text2img", {
  //       text: "otter",
  //     });
  //     return resp.output_url;
  //   }
}
