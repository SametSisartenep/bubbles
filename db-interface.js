var mysql = require('mysql'),
  utils = require('./utils');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'user',
  pass: 'pass',
  database: 'bubbles'
});

// Saves us from falling into the JSON object's claws :P
function checkArray ( object, callback ) {
  object.length === 'undefined' || object[0] === 'undefined' ?
    null
  :
    callback();
}

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
  connection.query(query, function ( error, rows, cols ) {
    if ( error )
    {
      utils.logError('Query error: ' + error.stack);
      return;
    }

    return { rows: rows, cols: cols };
  });
}

function select ( table, fields, condition ) {
  var SET = '';

  if ( typeof fields === 'object' )
  {
    checkArray(fields, function () {
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
    });
  }
  else if (typeof fields === 'string')
  {
    SET = fields;
  }
  else
  {
    utils.logError('Datatype not supported for querying.');
    return;
  }

  query('SELECT ' + SET + ' FROM ' + table + ' WHERE ' + condition);
}

function update ( table, fields, values, condition ) {
  var SET = '';

  if ( typeof fields === 'object' && typeof values === 'object' )
  {
    // If "fields" is 'Array', then check "values". If it's too, execute this lambda.
    checkArray(fields, checkArray(values, function () {
      if ( fields.length === values.length )
      {
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
      }
      else
      {
        utils.logError('"fields" don\'t match "values".');
        return;
      }
    }));
  }
  else if ( typeof fields === 'string' && typeof values === 'string' )
  {
    fields = fields.split(',');
    values = values.split(',');

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
  }
  else
  {
    utils.logError('Datatypes not supported for querying.');
    return;
  }

  query('UPDATE ' + table + ' SET ' + SET + ' WHERE ' + condition);
}

function delete ( table, condition ) {
  query('DELETE FROM ' + table + ' WHERE ' + condition);
}