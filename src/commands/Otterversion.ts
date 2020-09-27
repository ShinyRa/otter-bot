import { Message } from "discord.js";

import { Command, CommandParams } from "./Command";
import { version } from "../../package.json";

export class Otterversion extends Command {
  public async reply({ message }: CommandParams): Promise<Message> {
    return message.reply(await this.execute());
  }

  public async execute(): Promise<string> {
    return `Ik draai nu versie [${version}] in ${process.env.NODE_ENV} omgeving`;
  }
}
