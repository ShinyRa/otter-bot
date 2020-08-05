import dotenv, { DotenvConfigOutput } from "dotenv";

export default class DotenvParser {
  config: DotenvConfigOutput;
  variables: Map<string, string>;

  constructor() {
    this.variables = new Map<string, string>();
    this.config = dotenv.config();
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
