import { Message } from "discord.js";

export type CommandParams = {
  message: Message;
};

export abstract class Command {
  abstract async execute(
    params: CommandParams
  ): Promise<Message | Array<Message>>;
}
