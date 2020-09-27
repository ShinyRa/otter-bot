import { Otter } from "../../commands";

describe("Otter command should work correctly", () => {
  const command = new Otter();
  it("Should give the expected output", async () => {
    const response = await command.execute();
    expect(response).toContain("https://pixabay.com");
  });
});
