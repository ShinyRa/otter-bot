import dotenv, { DotenvConfigOutput } from "dotenv";

export default class DotenvParser {
  environment: string;
  config: DotenvConfigOutput;
  variables: Map<string, string>;

  constructor(environment: string) {
    this.environment = environment;
    this.variables = new Map<string, string>();
    this.config = dotenv.config({
      path: `${this.environment === "test" ? ".test" : ""}.env`,
    });
    this.retrieveVariables();
  }

  private retrieveVariables() {
    const parsed = this.config.parsed;
    for (const key in parsed) {
      if (Object.prototype.hasOwnProperty.call(parsed, key)) {
        this.variables.set(key, parsed[key]);
      }
    }
  }

  getVariables(): Map<string, string> {
    return this.variables;
  }

  get(key: string): string {
    return this.variables.get(key) || "";
  }
}
