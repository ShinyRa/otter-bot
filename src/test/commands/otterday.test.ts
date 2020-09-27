import { Otterday } from "../../commands";

describe("Otterday command should work correctly", () => {
  const command = new Otterday();
  it("Should give the expected output", async () => {
    const response = await command.execute();

    if (command.otterday()) {
      expect(response).toBe("Het is otterdag!");
    } else {
      expect(response).not.toBe("Het is otterdag!");
    }
  });
});
