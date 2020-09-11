import DotenvParser from "../utils/DotenvParser";

describe("Dotenv parser is created sucessfully", () => {
  test("Dotenvparser instanciated", () => {
    const dotenvParser = new DotenvParser();
    expect(dotenvParser).toBeTruthy();
  });

  test("Values successfully read from dot env file", () => {
    const dotenvParser = new DotenvParser();
    expect(dotenvParser.get("API_KEY")).toEqual("4p1_k3y");
  });
});
