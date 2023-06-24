import chalk from "chalk";
import winston from "winston";

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.timestamp(),
                winston.format.printf(({ level, message, timestamp }) => {
                    return `[${timestamp}] ${level} : ${message}`;
                })
            )
        })
    ]
});

function _args(...args: any[]): any {
    try {
        return args.map(arg => {
            if (arg instanceof Error) {
                return `${arg.name}: ${arg.message}\n${arg.stack}`;
            }
            if (typeof arg === 'object') {
                return "\n" + JSON.stringify(arg, null, 2) + "\n";
            }
            return String(arg);
        }).join(' ');
    } catch (err) {
        return args;
    }
}

const consola = {...console};
console.log = (...args) => consola.log(...args);
console.info = (...args) => consola.info(...args);
console.warn = (...args) => consola.warn(...args);
console.error = (...args) => consola.error(...args);
console.debug = (...args) => consola.debug(...args);

export default logger;