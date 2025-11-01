import winston from "winston";
import morgan from "morgan";

// LOGGING FUNCTION 
export const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({timestamp, level, message}) => {
            return `${timestamp} [${level.toUpperCase()}]: ${message}`
        })
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({filename: './logs/error.log', level: 'error'}),
        new winston.transports.File({filename: './logs/combined.log'})
    ]
})
// REQUESTS LISTENER 
export const morganMiddleware = morgan('combined', {
    stream: {
        write: (message) => logger.info(message.trim())
    }
})
// WARNING HELPER FUNCTION 
export const logWarning = (message) => logger.warn(message)
