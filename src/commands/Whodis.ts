import { Message } from "discord.js";
import { Command, CommandParams } from "./Command";

export class Whodis extends Command {
  public async execute({ message }: CommandParams): Promise<Message> {
    return new Promise(() => {
      message.reply("Ik ben tot leven gewekt door Tijs en Auke!");
    });
  }
}
