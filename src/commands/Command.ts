import { OtterLogger } from "../utils/logger/OtterLogger";

export abstract class Command {
  logger: OtterLogger;
  constructor(logger: OtterLogger) {
    this.logger = logger;
  }

  abstract execute(params: Array<any>): void;
}
