import { Message } from "discord.js";

import { Command, CommandParams } from "./Command";

export class Repeat extends Command {
  private client;

  constructor(client) {
    super();
    this.client = client;
  }
  public async reply({ message }: CommandParams): Promise<Message> {
    if (message.author.id != "349607754807246858") {
      return message.author.send("No!");
    }

    return this.client.channels.cache
      .find((channel) => channel.id == "738110957514915931")
      .send(null, { files: [await this.execute()] });
  }

  public async execute(): Promise<string> {
    return "./assets/Postcard.png";
  }
}
