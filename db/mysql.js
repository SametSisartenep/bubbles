var mysql = require('mysql'),
  pool = mysql.createPool(require('./mysql.cfg'));

module.exports.getDatabases = function ( callback ) {
  pool.getConnection(function ( err, connection ) {
    if (err) {
      console.error(err);
      callback(true);
      return;
    }
    connection.query('SHOW DATABASES', [], function ( err, results ) {
      connection.release();
      if (err) {
        console.error(err);
        callback(true);
        return;
      }
      callback(false, results);
    });
  });
};
