import { Help } from "../../commands";

describe("Help command should work correctly", () => {
  const command = new Help();
  it("Should give the expected output", async () => {
    const response = await command.execute();
    expect(response).toContain("Hier komt wat Otter wijsheid!");
  });
});
