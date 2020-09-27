import { Message } from "discord.js";
import axios from "axios";

import { Command, CommandParams } from "./Command";

export class Otter extends Command {
  public async reply({ message }: CommandParams): Promise<Message> {
    try {
      const result = await this.getOtterPic();
      return message.reply("Hier, een mooie otter pic!", {
        files: [await this.execute()],
      });
    } catch {
      return message.reply("Mislukt om otter pic op te halen :(");
    }
  }

  public async execute(): Promise<string> {
    return this.getOtterPic();
  }

  private async getOtterPic(): Promise<string> {
    const randompage = Math.floor(Math.random() * 13) + 1;
    const response = await axios.get(
      `https://pixabay.com/api/?key=${process.env.PIXABAY_KEY}&q=otter&image_type=photo&per_page=20&page=${randompage}`
    );
    const randomPicture = Math.floor(Math.random() * response.data.hits.length);
    return response.data.hits[randomPicture].webformatURL;
  }
}
