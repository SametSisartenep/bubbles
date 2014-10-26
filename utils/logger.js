require('./color').loadColors();

module.exports = exports = {
  log: function ( message ) {
    console.log(message);
  },
  logWarn: function ( message ) {
    console.warn(message.yellow);
  },
  logError: function ( message ) {
    console.error(message.red);
  },
  logHTTP: function ( method, status_code, message ) {
    if (status_code < 200 && status_code >= 100)
    {
      this.log(method.cyan + ' ' + status_code.toString().blue + ' ' + message);
    }
    else if (status_code < 300)
    {
      this.log(method.cyan + ' ' + status_code.toString().green + ' ' + message);
    }
    else if (status_code < 400)
    {
      this.log(method.cyan + ' ' + status_code.toString().yellow + ' ' + message);
    }
    else if (status_code < 500)
    {
      this.logError(method.cyan + ' ' + status_code.toString().red + ' ' + message);
    }
    else if (status_code < 600)
    {
      this.logError(method.cyan + ' ' + status_code.toString().red + ' ' + message);
    }
    else
    {
      this.logError('Method ' + method + ' does not exist');
    }
  }
};