import { Message } from "discord.js";
import moment, { Moment } from "moment-timezone";

import { Command, CommandParams } from "./Command";

export class Meme extends Command {
  // private otterdayCelebrationDate: Moment;

  constructor() {
    super();
    // this.otterdayCelebrationDate = moment("2020-07-01", "YYYY-MM-DD");
  }

  public async reply({ message }: CommandParams): Promise<Message> {
    return message.reply(await this.execute());
  }

  public async execute(): Promise<string> {
    return "Meme";
  }

  // public otterdayFormat(): string {
  //   if (this.otterday()) {
  //     return "Het is otterdag!";
  //   } else {
  //     const tomorrow = moment()
  //       .tz("Europe/Amsterdam")
  //       .add(1, "days")
  //       .set({ hour: 0, minute: 0, second: 0 });

  //     const diff = moment.duration(
  //       tomorrow.diff(moment().tz("Europe/Amsterdam"))
  //     );
  //     const hours = diff.asMinutes() / 60;
  //     const minutes = diff.asMinutes() - Math.floor(hours) * 60;
  //     return `Nog maar ${Math.floor(hours)} uur en ${Math.ceil(
  //       minutes
  //     )} minuten tot volgende otterdag!`;
  //   }
  // }

  // public otterday(): boolean {
  //   const daysPassed = moment()
  //     .tz("Europe/Amsterdam")
  //     .diff(this.otterdayCelebrationDate, "days");
  //   return daysPassed % 2 == 0;
  // }
}
