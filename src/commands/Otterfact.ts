import { Message } from "discord.js";
import axios from "axios";
import randomWords from "random-words";

import { Command, CommandParams } from "./Command";

export class Otterfact extends Command {
  public async execute({ message }: CommandParams): Promise<Message> {
    return new Promise(async () => {
      const msg = await message.reply("Ik ben aan het denken");
      let count = 1;
      const loading = setInterval(() => {
        if (count % 4 == 0) {
          count = 1;
          msg.edit("Ik ben aan het denken.");
        } else {
          msg.edit(msg.content + ".");
        }
        count++;
      }, 3000);
      this.getDeepOtterFact()
        .then((result) => {
          clearInterval(loading);
          msg.edit(result);
        })
        .catch((error) => {
          msg.reply(error);
        });
    });
  }

  /**
   * Generates otterfact via DeepAI algorithm
   */
  async getDeepOtterFact(): Promise<string> {
    const response = await axios({
      method: "post",
      url: `https://api.deepai.org/api/text-generator`,
      headers: { "api-key": process.env.DEEP_AI_KEY },
      data: `text=Did you know otter ${randomWords({
        exactly: 4,
        join: " ",
      })}?`,
    }).catch(() => fail("Mislukt om otter feit op te halen :("));
    return response.data.output.substring(0, 250) + " ...";
  }
}
