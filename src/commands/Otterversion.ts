import { Message } from "discord.js";

import { Command, CommandParams } from "./Command";
import { version } from "../../package.json";

export class Otterversion extends Command {
  public async execute({ message }: CommandParams): Promise<Message> {
    return message.reply(
      `Ik draai nu versie [${version}] in ${process.env.NODE_ENV} omgeving`
    );
  }
}
