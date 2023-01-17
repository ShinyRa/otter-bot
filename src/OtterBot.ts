import { Client, Message, REST, Routes, GatewayIntentBits } from "discord.js";

import { version } from "../package.json";
import { OtterLogger } from "./utils/logger/OtterLogger";
import { ActivityStatusEnum } from "./utils/logger/activity/ActivityStatusEnum";

import * as Cmd from "./commands";
import { Profanityfilter } from "./utils/profanity/Profanityfilter";

export default class OtterBot {
  logger: OtterLogger;
  client: Client;
  profanityfilter: Profanityfilter;

  PREFIX: string = "?";
  commands: Map<string[], any> = new Map<string[], any>();
  getCommandFromIdentifier: (string) => any;

  constructor(logger: OtterLogger) {
    const { clientId, guildId, token } = require("./config.json");
    this.logger = logger;
    this.client = new Client({ intents: [GatewayIntentBits.Guilds] });
    this.profanityfilter = new Profanityfilter();

    this.commands.set(["help"], new Cmd.Help());
    this.commands.set(["otter"], new Cmd.Otter());
    this.commands.set(["otterdag", "otterday"], new Cmd.Otterday());
    this.commands.set(
      ["hoeveelotterdagen", "howmanyotterdays"],
      new Cmd.Howmanyotterdays()
    );
    this.commands.set(["otterofniet", "otterornot"], new Cmd.Otterornot());
    this.commands.set(["whodis"], new Cmd.Whodis());
    this.commands.set(["rareotter"], new Cmd.Weirdotter());
    this.commands.set(["otterfeit", "feit", "otterfact"], new Cmd.Otterfact());
    this.commands.set(["otterpog", "pog"], new Cmd.Pogotter());
    this.commands.set(["versie", "version"], new Cmd.Otterversion());
    this.commands.set(["meme", "meme"], new Cmd.Otterversion());
    // this.commands.set("repeat", new Cmd.Repeat(this.client));
    // Construct and prepare an instance of the REST module
    const rest = new REST({ version: "10" }).setToken(token);

    (async () => {
      try {
        console.log(
          `Started refreshing ${this.commands.size()} application (/) commands.`
        );

        // The put method is used to fully refresh all commands in the guild with the current set
        const data = await rest.put(
          Routes.applicationGuildCommands(clientId, guildId),
          { body: this.commands }
        );

        console.log(
          `Successfully reloaded ${data.length} application (/) commands.`
        );
      } catch (error) {
        // And of course, make sure you catch and log any errors!
        console.error(error);
      }
    })();

    this.getCommandFromIdentifier = (identifier: string): any => {
      for (const identifiers of this.commands.keys()) {
        if (identifiers.includes(identifier)) {
          return this.commands.get(identifiers);
        }
      }
      return false;
    };

    this.client
      .login(process.env.API_KEY)
      .catch((err) => {
        this.logger.report(err.message, ActivityStatusEnum.ERROR);
        this.logger.report(
          `Unable to log in with key ${process.env.API_KEY}`,
          ActivityStatusEnum.ERROR
        );
      })
      .finally(() => {
        // this.listenForCommands();
        this.client.user?.setActivity(
          `[${version}] in ${process.env.NODE_ENV} environment!`
        );
      });

    this.client.on("ready", () => {
      this.logger.report(`Logged in as ${this.client.user?.tag}!`);
      setInterval(() => {
        this.client.user?.setActivity(
          this.getCommandFromIdentifier("otterdag")?.otterdayFormat()
        );
      }, 60000);
    });

    this.client.on("error", (err) => {
      this.logger.report(err.message, ActivityStatusEnum.ERROR);
    });
  }

  listenForCommands(): void {
    this.client.on("interactionCreate", async (interaction) => {
      if (!interaction.isChatInputCommand()) return;

      const identifier = interaction.commandName;
      const command = this.getCommandFromIdentifier(identifier);

      if (command instanceof Cmd.Command) {
        // this.logger.report(
        //   `Executing command "${message.content}", for user ${message.author.tag}`
        // );
        command.reply({ message: interaction });
        // .then(() => {
        //   this.logger.report(
        //     `Completed command "${message.content}", for user ${message.author.tag}`
        //   );
        // })
        // .catch((error) => {
        //   this.logger.report(
        //     `Failed to execute command "${message.content}", for user ${message.author.tag}`,
        //     ActivityStatusEnum.ERROR
        //   );
        //   this.logger.report(error, ActivityStatusEnum.ERROR);
        // });
      }
    });
  }

  public logout(): void {
    this.logger.report(`Logging out otterbot...`);
    this.client.destroy();
    this.logger.report(`Goodbye!`);
  }

  /**
   * Gets the amount of time this server is currently running
   */
  // upTimeBot(): string {
  //   let totalSeconds = this.client.uptime || 0 / 1000;
  //   let days = Math.floor(totalSeconds / 86400);
  //   let hours = Math.floor(totalSeconds / 3600);
  //   totalSeconds %= 3600;
  //   let minutes = Math.floor(totalSeconds / 60);
  //   let seconds = Math.floor(totalSeconds % 60);
  //   return `Deze otter is al ${days} dagen, ${hours} uur, ${minutes} minuten en ${seconds} seconden aan het werk!`;
  // }
}
