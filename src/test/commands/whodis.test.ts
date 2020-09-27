import { Whodis } from "../../commands";

describe("Whodis command should work correctly", () => {
  const command = new Whodis();
  it("Should give the expected output", async () => {
    const response = await command.execute();
    expect(response).toBe("Ik ben tot leven gewekt door Tijs en Auke!");
  });
});
