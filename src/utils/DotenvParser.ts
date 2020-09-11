import dotenv, { DotenvConfigOutput } from "dotenv";

export default class DotenvParser {
  config: DotenvConfigOutput;
  variables: Map<string, string>;

  constructor() {
    this.variables = new Map<string, string>();
    this.config = dotenv.config({
      path: `${process.env.NODE_ENV === "test" ? ".test" : ""}.env`,
    });
    this.retrieveVariables();
  }

  private retrieveVariables() {
    if (process.env.NODE_ENV == "production") {
      this.variables.set("API_KEY", process.env.API_KEY || "none");
      this.variables.set("DEEP_AI_KEY", process.env.DEEP_AI_KEY || "none");
      this.variables.set("PIXABAY_KEY", process.env.PIXABAY_KEY || "none");
    } else {
      const parsed = this.config.parsed;
      for (const key in parsed) {
        if (Object.prototype.hasOwnProperty.call(parsed, key)) {
          this.variables.set(key, parsed[key]);
        }
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
