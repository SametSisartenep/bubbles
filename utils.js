var color = require('./utils/color'),
  mime = require('./utils/mime-types'),
  http = require('./utils/http-stat-codes'),
  time = require('./utils/time'),
  logger = require('./utils/logger');

module.exports = {
  loadColors: function () {
    color.loadColors();
  },
  getMIME: function ( file_extension ) {
    return mime.getMIME(file_extension);
  },
  getStatusCode: function ( status, tiny ) {
    return http.getStatusCode(status, tiny);
  },
  getTime: function () {
    return time.getTime();
  },
  log: function ( message ) {
    logger.log(message);
  },
  logWarn: function ( message ) {
    logger.logWarn(message);
  },
  logError: function ( message ) {
    logger.logError(message);
  },
  logHTTP: function ( method, status_code, message ) {
    logger.logHTTP(method, status_code, message);
  }
};