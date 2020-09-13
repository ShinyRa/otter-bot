import { ActivityStatusEnum } from "./ActivityStatusEnum";
import moment from "moment";

export class Activity {
  private status: ActivityStatusEnum;
  private time: string;
  private message: string;

  constructor(message: string, status?: ActivityStatusEnum) {
    this.message = message;
    this.time = moment().format("MMMM Do YYYY, h:mm:ss a");
    this.status = status || ActivityStatusEnum.INFO;
  }

  getFormatted(): string {
    return `[${this.time}]: ${this.message}, with status ${
      ActivityStatusEnum[this.status]
    }}`;
  }

  getMessage(): string {
    return this.message;
  }

  getSeverity(): string {
    return ActivityStatusEnum[this.status].toLowerCase() || "error";
  }
}
