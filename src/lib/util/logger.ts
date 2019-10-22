import winston from 'winston';

const mformat = winston.format.printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const logger = winston.createLogger({
  level:'info',
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    mformat,
  ),
  transports: [
    new winston.transports.Console({
      level: 'info',
    }),
    new winston.transports.File({
      filename: '/slack-emoji-adder.log',
      level: 'info',
    })
  ]
});

export default logger;
