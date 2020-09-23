import { Message } from "discord.js";
import axios from "axios";

import { Command, CommandParams } from "./Command";

export class Otterornot extends Command {
  public async execute({ message }: CommandParams): Promise<Message> {
    try {
      const result = this.getOtterPic();
      return message.reply(`${result} \n\nKreeg je een otter of niet?`);
    } catch {
      return message.reply("Mislukt om otter pic op te halen :(");
    }
  }

  private async getOtterPic(): Promise<string> {
    return axios
      .get("https://source.unsplash.com/1600x900/?otter")
      .then((response) => {
        return response.request.res.responseUrl;
      });
  }
}
