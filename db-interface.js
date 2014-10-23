var mysql = require('mysql'),
  utils = require('./utils');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'user',
  pass: 'pass',
  database: 'bubbles'
});

function connect () {
  connection.connect(function ( error ) {
    if ( error )
    {
      utils.logError('Error connecting: ' + error.stack);
      return;
    }

    utils.log('MySQL connection established. id(' + connection.threadId + ')');
  });
}

function query ( query ) {
  connection.query(query, function ( error, rows, fields ) {
    if ( error )
    {
      utils.logError('Query error: ' + error.stack);
      return;
    }

    return { rows: rows, fields: fields };
  });
}

function select ( table, fields, condition ) {
  var SET = '';

  for ( var i = 0; i < fields.length; i++ )
  {
    if ( i === fields.length - 1 )
    {
      SET += fields[i];
    }
    else
    {
      SET += fields[i] + ',';
    }
  }

  query('SELECT ' + SET + ' FROM ' + table + ' WHERE ' + condition);
}

function update ( table, fields, values, condition ) {
  if ( fields.length !== values.length )
  {
    utils.logError('"fields" don\'t match "values".');
    return;
  }

  var SET = '';

  for ( var i = 0; i < fields.length; i++ )
  {
    if ( i === fields.length - 1 )
    {
      SET += fields[i] + '=' + values[i];
    }
    else
    {
      SET += fields[i] + '=' + values[i] + ',';
    }
  }

  query('UPDATE ' + table + ' SET ' + SET + ' WHERE ' + condition);
}

function delete ( table, condition ) {
  query('DELETE FROM ' + table + ' WHERE ' + condition);
}