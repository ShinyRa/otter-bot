import { Otterornot } from "../../commands";

describe("Otterornot command should work correctly", () => {
  const command = new Otterornot();
  it("Should give the expected output", async () => {
    const response = await command.execute();
    expect(response).toContain("https://images.unsplash.com");
  });
});
