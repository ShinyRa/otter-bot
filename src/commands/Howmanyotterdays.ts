import { Message } from "discord.js";
import moment, { Moment } from "moment";

import { Command, CommandParams } from "./Command";

export class Howmanyotterdays extends Command {
  private otterdayCelebrationDate: Moment;

  constructor() {
    super();
    this.otterdayCelebrationDate = moment("2020-07-01", "YYYY-MM-DD");
  }

  public async reply({ message }: CommandParams): Promise<Message> {
    return message.reply(await this.execute());
  }

  public async execute(): Promise<string> {
    return `Er zijn al ${this.otterdayCount()} otterdagen geweest!`;
  }

  public otterdayCount(): number {
    return Math.floor(moment().diff(this.otterdayCelebrationDate, "days") / 2);
  }
}
