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

const bot = new OtterBot(logger);

process.on("SIGINT", () => {
  bot.logout();
  process.exit(0);
});
