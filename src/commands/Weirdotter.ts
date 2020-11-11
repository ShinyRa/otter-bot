import { Message } from "discord.js";
import axios from "axios";

import { Command, CommandParams } from "./Command";

export class Weirdotter extends Command {
  public async reply({ message }: CommandParams): Promise<Message> {
    try {
      const result = await this.execute();
      return message.reply("Hier, een rare otter pic!", {
        files: [result],
      });
    } catch {
      return message.reply("Mislukt om otter pic op te halen :(");
    }
  }

  public async execute(): Promise<string> {
    return await this.getDeepAiOtter();
  }

  /**
   * Generates a otter via the DeepAI algorithm
   */
  async getDeepAiOtter() {
    const response = await axios({
      method: "post",
      url: "https://api.deepai.org/api/text2img",
      headers: { "api-key": process.env.DEEP_AI_KEY },
      data: "text=otter",
    });
    return response.data.output_url;
  }
}
