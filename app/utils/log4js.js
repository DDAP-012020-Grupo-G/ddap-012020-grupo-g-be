// remember to change the require to just 'log4js' if you've npm install'ed it
const log4js = require('log4js');

log4js.configure({
  appenders: { services: { type: 'file', filename: 'services.log' } },
  categories: { default: { appenders: ['services'], level: 'info' } }
});

const logger = log4js.getLogger('services');
logger.level = 'INFO';

logger.info('Server is now on.');