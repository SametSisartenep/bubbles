var mysql = require('mysql'),
  utils = require('./utils');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'user',
  pass: 'pass',
  database: 'bubbles'
});

module.exports = exports = {
  connect: function () {
    connection.connect(function ( error ) {
      if ( error )
      {
        utils.logError('Error connecting: ' + error.stack);
        return;
      }

      utils.log('MySQL connection established. id(' + connection.threadId + ')');
    });
  },
  query: function ( query ) {
    connection.query(query, function ( error, rows, fields ) {
      if ( err )
      {
        utils.logError('Error querying: ' + error.stack);
        return {error: true};
      }

      return { rows: rows, fields: fields };
    });
  },
  end: function () {
    connection.end();
  }
};