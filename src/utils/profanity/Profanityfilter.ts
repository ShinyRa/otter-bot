import { Message } from "discord.js";

import * as fs from "fs";
import * as readline from "readline";

export class Profanityfilter {
  private path: string = "src/utils/profanity/profanity.txt";

  /**
   * Check if message contains swearwords.
   *
   * @param message Message | Discord message.
   * @returns Promise<boolean> | True if message contains swearword.
   */
  public async checkword(message: Message): Promise<boolean> {
    const readInterface = readline.createInterface({
      input: fs.createReadStream(this.path),
    });

    let containsSwearWord = false;
    const words = message.content.split(" ");

    for await (const line of readInterface) {
      for (const word of words) {
        if (line.trim() == this.cleanPrefix(word)) containsSwearWord = true;
      }
    }

    return containsSwearWord;
  }

  /**
   * Clean command from prefix
   *
   * @param command string
   * @returns string | cleaned command
   */
  private cleanPrefix = (command: string): string =>
    command.charAt(0) === "?" ? command.substring(1) : command;
}
