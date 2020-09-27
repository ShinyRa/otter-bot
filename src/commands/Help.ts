import { Message } from "discord.js";

import { Command, CommandParams } from "./Command";

export class Help extends Command {
  public async reply({ message }: CommandParams): Promise<Message> {
    return message.author.send(await this.execute());
  }

  public async execute(): Promise<string> {
    return `
      Hier komt wat Otter wijsheid!
      
      ${this.bold(
        "?help"
      )}: Geeft informatie over het gebruik van de Otter-bot! (op het moment alleen de commands)
      ${this.bold("?otter")}: Geeft een mooie otter foto!
      ${this.bold("?otterdag")}: Ehhhhh wanneer is het otterdag dan?!
      ${this.bold("?rareotter")}: Geeft een otter foto gegenereerd door DeepAi
      ${this.bold("?otterofniet")}: Doe eens een gok!
      ${this.bold(
        "?hoeveelotterdagen"
      )}: Hoeveel otterdagen zijn er al geweest sinds de launch van Otter-bot?
      ${this.bold("?otterfeit")}: Geeft een leuk feitje over de otter!
      ${this.bold("?whodis")}: Geeft wat info over de gezellige codeurs!
      ${this.bold("?pog")}: De otter pogt, hoe dan?
      ${this.bold("?versie")}: Geeft mijn versie terug

      Waar wacht je nog op! ga praten met de otter in het otter kanaal!`;
  }

  private bold(text: string): string {
    return `**${text}**`;
  }
}
