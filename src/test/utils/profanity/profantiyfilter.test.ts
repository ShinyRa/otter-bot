import { Profanityfilter } from "../../../utils/profanity/Profanityfilter";
import { Client, Guild, TextChannel, Message } from "discord.js";

const createMessage = (message) => {
  const mockedClient = new Client();
  const mockedGuild = new Guild(mockedClient, {});
  const mockedChannel = new TextChannel(mockedGuild, {});
  return new Message(
    mockedClient,
    { id: "id", content: message },
    mockedChannel
  );
};

describe("Profanity filter should censor words", () => {
  const filter = new Profanityfilter();

  it("Should censor the word datnigga", async () => {
    const response = await filter.checkword(createMessage("?datnigga"));
    expect(response).toBeTruthy();
  });

  it("Should not censor the word wooper", async () => {
    const response = await filter.checkword(createMessage("?wooper"));
    expect(response).not.toBeTruthy();
  });

  it("Should censor words after first command", async () => {
    const response = await filter.checkword(createMessage("?otter dead"));
    expect(response).toBeTruthy();
  });
});
