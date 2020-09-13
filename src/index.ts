// import { scheduleJob } from "node-schedule";
import readline from "readline";
import OtterBot from "./OtterBot";
import { version } from "../package.json";
import { OtterLogger } from "./utils/logger/OtterLogger";

const ENV = process.env.NODE_ENV || "";
const IO = readline.createInterface(process.stdin, process.stdout);
const logger: OtterLogger = new OtterLogger(IO);

let welcome: String = String.raw`


 ______   ______  ______  ______   ______   ______   ______   ______  
/\  __ \ /\__  _\/\__  _\/\  ___\ /\  == \ /\  == \ /\  __ \ /\__  _\ 
\ \ \/\ \\/_/\ \/\/_/\ \/\ \  __\ \ \  __< \ \  __< \ \ \/\ \\/_/\ \/ 
 \ \_____\  \ \_\   \ \_\ \ \_____\\ \_\ \_\\ \_____\\ \_____\  \ \_\ 
  \/_____/   \/_/    \/_/  \/_____/ \/_/ /_/ \/_____/ \/_____/   \/_/ 


`;

logger.writeToConsole(welcome.toString());
logger.report(`Version: [${version}]`);
logger.report(`Lauching otterbot in ${ENV} environment...`);
logger.report(`Logging in otterbot...`);

if (ENV === "production") {
  console = console || {};
  console.log = function () {};
}

const bot = new OtterBot(logger);

process.on("SIGINT", () => {
  logger.report(`Logging out otterbot...`);
  bot.logout();
  logger.report(`Goodbye!`);
  process.exit(0);
});

// //To be or not to be otter day. That is the question.
// schedule.scheduleJob("0 0 * * *", () => {
//   //for read-ability I have split the assignment of the isOtterday variable and the bound actions into 2 expressions.
//   isOtterday ? (isOtterday = false) : (isOtterday = true);
//   if (isOtterday) {
//     bot.user.setActivity("Het is otterdag!", {
//       type: "STREAMING",
//       url: "https://www.youtube.com/watch?v=OjqyQr1Fa4g",
//     });
//     bot.channels.cache
//       .get("738031504940335194")
//       .send("@everyone Het is otter dag!");
//   } else {
//     bot.user.setActivity("Het is geen otter dag...");
//     bot.channels.cache
//       .get("738031504940335194")
//       .send("@everyone Otter dag is afgelopen...");
//   }
// });
