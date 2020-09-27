import { Otterfact } from "../../commands";

describe("Otterfact command should work correctly", () => {
  const command = new Otterfact();
  it("Should give the expected output", async () => {
    const response = await command.execute();
    expect(response.length).toEqual(254);
  });
});
