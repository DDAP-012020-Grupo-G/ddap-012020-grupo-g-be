const logger = require('./log4js')
const responseTime = require('response-time')

module.exports = loggerHandler

function loggerHandler() {
  return responseTime((req, res, time) => {
    const log = `[METHOD: ${req.method}] [URL: ${req.url}] [PARAMS: ${JSON.stringify(req.params)}] [BODY: ${JSON.stringify(req.body)}] [STATUS: ${res.statusCode}] [TIME: ${time}]`
    if (res.statusCode === 200) 
      logger.info(log)
    else
      logger.error(log)
  })
}
