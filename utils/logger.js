/*
*   levels -> 'info', 'warn', 'error', 'INFO', 'WARN', 'ERROR'
*/

require('./color').loadColors();

module.exports = exports = {
  log: function ( message ) {
    console.log(message);
  },
  logWarn: function ( message ) {
    console.warn(message);
  },
  logError: function ( message ) {
    console.error(message);
  }
};