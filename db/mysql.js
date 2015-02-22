var mysql = require('mysql'),
  pool = mysql.createPool(require('./mysql.cfg'));

pool.on('connection', function ( connection ) {
  console.log('Database connection ' + connection.threadId);
});

function query ( queryString, callback ) {
  pool.getConnection(function ( err, connection ) {
    if (err) {
      console.log(err);
      callback(true);
      return;
    }
    connection.query(queryString, [], function ( err, results ) {
      connection.release();
      if (err) {
        console.log(err);
        callback(true);
        return;
      }
      callback(false, results);
    });
  });
}

module.exports.getDatabases = function ( callback ) {
  query('SHOW DATABASES', callback);
};

module.exports.describeUsers = function ( callback ) {
  query('DESCRIBE Users', callback);
};
