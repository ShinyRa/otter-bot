// import { scheduleJob } from "node-schedule";
import readline from "readline";
import OtterBot from "./OtterBot";
import { version } from "../package.json";

const ENV = process.env.NODE_ENV || "";
const IO = readline.createInterface(process.stdin, process.stdout);
let welcome: String = String.raw`


______   ______  ______  ______   ______   ______   ______   ______  
/\  __ \ /\__  _\/\__  _\/\  ___\ /\  == \ /\  == \ /\  __ \ /\__  _\ 
\ \ \/\ \\/_/\ \/\/_/\ \/\ \  __\ \ \  __< \ \  __< \ \ \/\ \\/_/\ \/ 
 \ \_____\  \ \_\   \ \_\ \ \_____\\ \_\ \_\\ \_____\\ \_____\  \ \_\ 
  \/_____/   \/_/    \/_/  \/_____/ \/_/ /_/ \/_____/ \/_____/   \/_/ 
                                                                      

`;

IO.write(welcome.toString());
IO.write("\n");
IO.write(`Version: [${version}]`);
IO.write("\n");
IO.write(`Lauching otterbot in ${ENV} environment...`);
IO.write(`\n`);
IO.write(`Logging in otterbot...`);
IO.write(`\n`);

if (ENV === "production") {
  console = console || {};
  console.log = function () {};
}

const bot = new OtterBot(ENV);

IO.write(`Logged in!`);
IO.write(`\n`);

process.on("SIGINT", () => {
  IO.write(`Logging out otterbot...`);
  IO.write(`\n`);
  bot.logout();
  IO.write(`Goodbye!`);
  IO.write(`\n`);
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
