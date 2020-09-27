import { Weirdotter } from "../../commands";

describe("Weirdotter command should work correctly", () => {
  const command = new Weirdotter();
  it("Should give the expected output", async () => {
    const response = await command.execute();
    expect(response).toContain("https://api.deepai.org");
  });
});
