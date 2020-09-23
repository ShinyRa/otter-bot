import { Message } from "discord.js";
import axios from "axios";

import { Command, CommandParams } from "./Command";

export class Pogotter extends Command {
  public async execute({ message }: CommandParams): Promise<Message> {
    return new Promise(() => {
      message.reply(null, {
        files: ["./assets/otter_pog.png"],
      });
    });
  }
}
