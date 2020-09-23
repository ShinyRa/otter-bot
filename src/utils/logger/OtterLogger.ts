import readline, { Interface } from "readline";

import winston from "winston";

import { Activity } from "./activity/Activity";
import { ActivityStatusEnum } from "./activity/ActivityStatusEnum";

export class OtterLogger {
  IO: Interface;
  logger: winston.Logger;

  constructor() {
    this.IO = readline.createInterface(process.stdin, process.stdout);
    this.logger = winston.createLogger({
      transports: [
        new winston.transports.File({ filename: "logs/composite.log" }),
      ],
    });
  }

  report(message: string, severity?: ActivityStatusEnum): void {
    const report = new Activity(message, severity);

    this.writeToConsole(report.getMessage());
    this.writeToLog(report);
  }

  writeToConsole(message: string): void {
    this.IO.write(message);
    this.IO.write("\n");
  }

  writeToLog(activity: Activity) {
    this.logger.log({
      level: activity.getSeverity(),
      message: activity.getFormatted(),
    });
  }
}
