import chalk from "chalk";
import moment from "moment";
const consola = {...console};
console.log = (...args) => consola.log(`[${moment().format("YYYY-MM-DD HH:MM")}]`,chalk.green("[ LOG ]"),...args);
console.info = (...args) => consola.info(`[${moment().format("YYYY-MM-DD HH:MM")}]`,chalk.blue("[INFO ]"),...args);
console.warn = (...args) => consola.warn(`[${moment().format("YYYY-MM-DD HH:MM")}]`,chalk.yellow("[WARN ]"),...args);
console.error = (...args) => consola.error(`[${moment().format("YYYY-MM-DD HH:MM")}]`,chalk.red("[ERROR]"),...args);
console.debug = (...args) => consola.debug(`[${moment().format("YYYY-MM-DD HH:MM")}]`,chalk.yellow("[DEBUG]"), ...args);

export default {};