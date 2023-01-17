import { Message } from "discord.js";

import { Command, CommandParams } from "./Command";
export class Whodis extends Command {
  public async reply({ message }: CommandParams): Promise<Message> {
    return message.reply(await this.execute());
  }

  public async execute(): Promise<string> {
    return "Ik ben tot leven gewekt door Tijs en Auke!";
  }
}
