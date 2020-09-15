import { Message } from "discord.js";
import { Command, CommandParams } from "./Command";
import moment, { Moment } from "moment";

export class Howmanyotterdays extends Command {
  private otterdayCelebrationDate: Moment;

  constructor() {
    super();
    this.otterdayCelebrationDate = moment("2020-07-01", "YYYY-MM-DD");
  }

  public async execute({ message }: CommandParams): Promise<Message> {
    return message.reply(
      `Er zijn al ${this.otterdayCount()} otterdagen geweest!`
    );
  }

  public otterdayCount(): number {
    return Math.floor(moment().diff(this.otterdayCelebrationDate, "days") / 2);
  }
}
