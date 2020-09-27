import { Otterversion } from "../../commands";
import { version } from "../../../package.json";

describe("Otterversion command should work correctly", () => {
  const command = new Otterversion();
  it("Should give the expected output", async () => {
    const response = await command.execute();
    expect(response).toBe(
      `Ik draai nu versie [${version}] in ${process.env.NODE_ENV} omgeving`
    );
  });
});
