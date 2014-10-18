var color = require('./utils/color'),
  mime = require('./utils/mime-types'),
  http = require('./utils/http-stat-codes'),
  time = require('./utils/time');

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
  }
}