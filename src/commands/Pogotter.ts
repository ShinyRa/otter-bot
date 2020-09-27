import { Message } from "discord.js";

import { Command, CommandParams } from "./Command";

export class Pogotter extends Command {
  public async reply({ message }: CommandParams): Promise<Message> {
    return message.reply(null, {
      files: [await this.execute()],
    });
  }

  public async execute(): Promise<string> {
    return "./assets/otter_pog.png";
  }
}
