import * as winston from 'winston'
import Constanta from './Constanta'
const { combine, timestamp, colorize, printf, prettyPrint } = winston.format

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
}

const level = (): string => {
  return Constanta.NODE_ENV === 'prod' ? 'info' : 'debug'
}



const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
}

winston.addColors(colors)

const format = combine(
  prettyPrint({ colorize: true }),
  colorize({ all: true }),
  timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  printf(input => `[${input.timestamp}] - [${input.level}]: ${input.message}`),

)

const transports = [
  new winston.transports.File({ filename: 'logs/errors/error.log', level: 'error', dirname: "logs/errors", handleExceptions: true, handleRejections: true }),
  new winston.transports.File({ filename: 'logs/apps/app.log', level: 'info', dirname: "logs/apps" }),
  new winston.transports.Console()
]



const logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
})

export default logger
