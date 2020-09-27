import { Message } from "discord.js";

export type CommandParams = {
  message: Message;
};

export abstract class Command {
  abstract async reply(
    params: CommandParams
  ): Promise<Message | Array<Message>>;
  abstract async execute(...params: []): Promise<string>;
}
