import { Message } from "discord.js";
import { Command, CommandParams } from "./Command";
import moment, { Moment } from "moment-timezone";

export class Otterday extends Command {
  private otterdayCelebrationDate: Moment;

  constructor() {
    super();
    this.otterdayCelebrationDate = moment("2020-07-01", "YYYY-MM-DD");
  }

  public async execute({ message }: CommandParams): Promise<Message> {
    return new Promise(() => {
      message.reply(this.otterdayFormat());
    });
  }

  public otterdayFormat(): string {
    if (this.otterday()) {
      return "Het is otterdag!";
    } else {
      const tomorrow = moment()
        .tz("Europe/Amsterdam")
        .add(1, "days")
        .set({ hour: 0, minute: 0, second: 0 });

      const diff = moment.duration(
        tomorrow.diff(moment().tz("Europe/Amsterdam"))
      );
      const hours = diff.asMinutes() / 60;
      const minutes = diff.asMinutes() - Math.floor(hours) * 60;
      return `Nog maar ${Math.floor(hours)} uur en ${Math.ceil(
        minutes
      )} minuten tot volgende otterdag!`;
    }
  }

  public otterday(): boolean {
    const daysPassed = moment()
      .tz("Europe/Amsterdam")
      .diff(this.otterdayCelebrationDate, "days");
    return daysPassed % 2 == 0;
  }
}
