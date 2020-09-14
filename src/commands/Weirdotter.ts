import { Message } from "discord.js";
import axios from "axios";
import FormData from "form-data";

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
      this.getDeepAiOtter()
        .then((result) => {
          message.reply("Hier, een rare otter pic!", {
            files: [result],
          });
        })
        .catch(() => {
          message.reply("Mislukt om otter pic op te halen :(");
        });
    });
  }

  /**
   * Generates a otter via the DeepAI algorithm
   */
  async getDeepAiOtter() {
    const response = await axios({
      method: "post",
      url: `https://api.deepai.org/api/text2img`,
      headers: { "api-key": this.dotenvParser.get("DEEP_AI_KEY") },
      data: "text=otter",
    });
    return response.data.output_url;
  }
}
