var fs = require('fs'),
  path = require('path'),
  utils = require('./utils');

function streamFile ( file, source, is_big ) {
  var stream;

  source.response.writeHead(utils.getStatusCode('OK'), {
    'Content-Type': utils.getMIME(path.extname(path.basename(file)))
  });

  if (is_big)
  {
    stream = fs.createReadStream(file, {bufferSize: 64 * 1024});
  }
  else
  {
    stream = fs.createReadStream(file);
  }

  stream.pipe(source.response);
  utils.logHTTP(source.request.method, 200, file + ' ' + (new Date() - source.time0) + 'ms');
}

function stats ( file, source ) {
  fs.stat(file, function ( err, stats ) {
    if (err)
    {
      source.response.writeHead(utils.getStatusCode('INTSRVERR'), {'Content-Type': 'text/html'});
      source.response.end('<h1>Error (500): Internal Server Error.</h1>');
      utils.logHTTP(source.request.method, 500, file + ' ' + (new Date() - source.time0) + 'ms');
    }
    else
    {
      streamFile(file, source, stats.size >= 104857600);
    }
  });
}

module.exports.checkFileAndServe = function ( file, source ) {
  fs.exists(file, function ( exists ) {
    if (exists)
    {
      stats(file, source);
    }
    else
    {
      source.response.writeHead(utils.getStatusCode('NOTFOUND'), {'Content-Type': 'text/html'});
      source.response.end('<h1>Error (404): ' + path.basename(file) + ' Not Found</h1>');
      utils.logHTTP(source.request.method, 404, file + ' ' + (new Date() - source.time0) + 'ms');
    }
  });
};