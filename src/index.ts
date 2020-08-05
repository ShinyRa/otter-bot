// import { scheduleJob } from "node-schedule";
import OtterBot from "./OtterBot";

const ENV = process.argv[2];

if (ENV === "production") {
  console = console || {};
  console.log = function () {};
}

const bot = new OtterBot(ENV);

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
