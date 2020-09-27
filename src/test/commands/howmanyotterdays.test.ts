import { Howmanyotterdays } from "../../commands";

describe("Howmanyotter command should work correctly", () => {
  const command = new Howmanyotterdays();
  it("Should give the expected output", async () => {
    const response = await command.execute();
    expect(response).toContain(
      `Er zijn al ${command.otterdayCount()} otterdagen geweest!`
    );
  });
});
