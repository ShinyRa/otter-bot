import { Interface } from "readline";
import winston from "winston";

import { Activity } from "./activity/Activity";
import { ActivityStatusEnum } from "./activity/ActivityStatusEnum";

export class OtterLogger {
  IO: Interface;
  logger: winston.Logger;

  constructor(IO: Interface) {
    this.IO = IO;
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
