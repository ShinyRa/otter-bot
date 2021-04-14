import { Message } from "discord.js";

export type CommandParams = {
  message: Message;
};

export abstract class Command {
  abstract reply(
    params: CommandParams
  ): Promise<Message | Array<Message>>;
  abstract execute(...params: []): Promise<string>;
}
