import { Message } from "discord.js";
import { Command, CommandParams } from "./Command";

export class Help extends Command {
  public async execute({ message }: CommandParams): Promise<Message> {
    return message.author.send(
      String.raw`
      Hier komt wat Otter wijsheid!
      
      **?help**: Geeft informatie over het gebruik van de Otter-bot! (op het moment alleen de commands)
      **?otterdag**: Ehhhhh wanneer is het otterdag dan?!
      **?rareotter**: Geeft een otter foto gegenereerd door DeepAi
      **?hoeveelotterdagen**: Hoeveel otterdagen zijn er al geweest sinds de launch van Otter-bot?
      **?whodis**: Geeft wat info over de gezellige codeurs!
      **?otter**: Geeft een mooie otter foto!
      
      Waar wacht je nog op! ga praten met de otter in het otter kanaal!`
    );
  }
}
