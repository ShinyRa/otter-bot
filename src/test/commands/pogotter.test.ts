import { Pogotter } from "../../commands";

describe("Pogotter command should work correctly", () => {
  const command = new Pogotter();
  it("Should give the expected output", async () => {
    const response = await command.execute();
    expect(response).toBe("./assets/otter_pog.png");
  });
});
