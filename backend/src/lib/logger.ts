import chalk from "chalk";
import moment from "moment";
const consola = {...console};
export const _console = {...console};
console.log = (...args) => consola.log(...args);
console.info = (...args) => consola.info(chalk.blue("[INFO ]"),...args);
console.warn = (...args) => consola.warn(chalk.yellow("[WARN ]"),...args);
console.error = (...args) => consola.error(chalk.red("[ERROR]"),...args);
console.debug = (...args) => consola.debug(chalk.yellow("[DEBUG]"), ...args);


export default {};