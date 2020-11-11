module.exports = {
  roots: ["src/test"],
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(js?|ts?)$",
  moduleFileExtensions: ["ts", "js"],
  setupFiles: ["./src/test/setupEnvironment.js"],
  testTimeout: 120000,
};
