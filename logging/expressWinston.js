const winston = require('winston');
require('winston-daily-rotate-file');

/*  ***
*   *** Winston logger
*   ***/
var transport = new (winston.transports.DailyRotateFile)({
  filename: process.env.LOGS_DIR + process.env.npm_package_name + '_%DATE%.log',
  datePattern: 'YYYY-MM-DD',//'YYYY-MM-DD HH'
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d'
});

const logger = winston.createLogger({
  level: 'info',
  defaultMeta: { app: process.env.npm_package_name},
  transports: [ transport],
  format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.prettyPrint()
    )
});

logger.stream = { 
  write: function(message, encoding){ 
    logger.log('info', message, {layer:'endpoint'}); 
  } 
}; 


module.exports = logger;