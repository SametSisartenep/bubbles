/*
*   levels -> 'info', 'warn', 'error', 'INFO', 'WARN', 'ERROR'
*/

require('./color').loadColors();

module.exports = exports = {
  log: function ( message ) {
    console.log(message);
  },
  logWarn: function ( message ) {
    console.warn(message.yellow());
  },
  logError: function ( message ) {
    console.error(message.red());
  },
  logHTTP: function ( method, status_code, file ) {
    if ( method < 200 && method >= 100 )
    {
      log(method.cyan() + status_code.blue() + file);
    }
    else if ( method < 300 )
    {
      log(method.cyan() + status_code.green() + file);
    }
    else if ( method < 400 )
    {
      log(method.cyan() + status_code.yellow() + file);
    }
    else if ( method < 500 )
    {
      logError(method.cyan() + status_code.red() + file);
    }
    else if ( method < 600 )
    {
      logError(method.cyan() + status_code.red() + file);
    }
    else
    {
      logError('Method ' + method + ' does not exist');
    }
  }
};