import { Client, Message } from "discord.js";
import { version } from "../package.json";
import { OtterLogger } from "./utils/logger/OtterLogger";
import { ActivityStatusEnum } from "./utils/logger/activity/ActivityStatusEnum";

import {
  Command,
  Help,
  Otterday,
  Otter,
  Whodis,
  Howmanyotterdays,
  Weirdotter,
  Otterornot,
} from "./commands";

export default class OtterBot {
  logger: OtterLogger;
  client: Client;

  PREFIX: string = "?";
  commands: Map<string, any> = new Map<string, any>();

  constructor(logger: OtterLogger) {
    this.logger = logger;
    this.client = new Client();

    this.commands.set("help", new Help());
    this.commands.set("otterdag", new Otterday());
    this.commands.set("otter", new Otter());
    this.commands.set("whodis", new Whodis());
    this.commands.set("hoeveelotterdagen", new Howmanyotterdays());
    this.commands.set("rareotter", new Weirdotter());
    this.commands.set("otterornot", new Otterornot());

    this.client
      .login(process.env.API_KEY)
      .catch((err) => {
        this.logger.report(err.message, ActivityStatusEnum.ERROR);
        this.logger.report(
          `Unable to log in with key ${process.env.NODE_ENV}`,
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
      setInterval(() => {
        this.client.user?.setActivity(
          this.commands.get("otterdag")?.otterdayFormat()
        );
      }, 60000);
    });

    this.client.on("error", (err) => {
      this.logger.report(err.message, ActivityStatusEnum.ERROR);
    });
  }

  listenForCommands() {
    this.client.on("message", async (message: Message) => {
      if (!message.content.startsWith(this.PREFIX)) return;

      const identifier = message.content.substring(1);
      const command = this.commands.get(identifier);

      if (command instanceof Command) {
        this.logger.report(
          `Executing command "${message.content}", for user ${message.author.tag}`
        );
        command
          .execute({ message: message })
          .then(() => {
            this.logger.report(
              `Completed command "${message.content}", for user ${message.author.tag}`
            );
          })
          .catch((error) => {
            this.logger.report(
              `Failed to execute command "${message.content}", for user ${message.author.tag}`,
              ActivityStatusEnum.ERROR
            );
            this.logger.report(error, ActivityStatusEnum.ERROR);
          });
      }
    });
  }

  public logout() {
    this.client.destroy();
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
}
