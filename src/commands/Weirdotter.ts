import { Message } from "discord.js";
import axios from "axios";

import { Command, CommandParams } from "./Command";
import DotenvParser from "../utils/DotenvParser";

export class Weirdotter extends Command {
  dotenvParser: DotenvParser;
  constructor(dotenvParser: DotenvParser) {
    super();
    this.dotenvParser = dotenvParser;
  }

  public async execute({ message }: CommandParams): Promise<Message> {
    return new Promise(() => {
      this.getOtterPic()
        .then((result) => {
          message.reply("Hier, een mooie otter pic!", {
            files: [result],
          });
        })
        .catch(() => {
          message.reply("Mislukt om otter pic op te halen :(");
        });
    });
  }

  private async getOtterPic(): Promise<string> {
    const randompage = Math.floor(Math.random() * 10) + 1;
    const response = await axios.get(
      `https://pixabay.com/api/?key=${this.dotenvParser.get(
        "PIXABAY_KEY"
      )}&q=otter&image_type=photo&per_page=20&page=${randompage}`
    );
    const randomPicture = Math.floor(Math.random() * response.data.hits.length);
    return response.data.hits[randomPicture].webformatURL;
  }
}
