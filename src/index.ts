import OtterBot from "./OtterBot";

import { OtterLogger } from "./utils/logger/OtterLogger";
import { version } from "../package.json";

const ENV = process.env.NODE_ENV;
const logger: OtterLogger = new OtterLogger();

const welcome = `

 ______   ______  ______  ______   ______   ______   ______   ______  
/\  __ \ /\__  _\/\__  _\/\  ___\ /\  == \ /\  == \ /\  __ \ /\__  _\ 
\ \ \/\ \\/_/\ \/\/_/\ \/\ \  __\ \ \  __< \ \  __< \ \ \/\ \\/_/\ \/ 
 \ \_____\  \ \_\   \ \_\ \ \_____\\ \_\ \_\\ \_____\\ \_____\  \ \_\ 
  \/_____/   \/_/    \/_/  \/_____/ \/_/ /_/ \/_____/ \/_____/   \/_/ 


`;

logger.writeToConsole(welcome);
logger.report(`Version: [${version}]`);
logger.report(`Lauching otterbot in ${ENV} environment...`);
logger.report(`Logging in otterbot...`);

const bot = new OtterBot(logger);

process.on("SIGINT", () => {
  bot.logout();
  process.exit(0);
});
