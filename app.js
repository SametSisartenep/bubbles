var utils = require('./utils');
var http = require('http');
var path = require('path');
var fs = require('fs');

var PORT = 1337;
var IP = '127.0.0.1';

utils.loadColors();

function loadGET ( request, response ) {
  var file = decodeURI(request.url);
  file = file === '/' ? './www/index.html' : './www' + file;

  var basefile = path.basename(file) || 'index.html';

  var cliIP = request.connection.remoteAddress;

  console.log(utils.getTime().log().blue() + ' - ' + '[' + cliIP.yellow() + '] requests file: ' + file);

  fs.exists(file, function ( exists ) {
    if (exists)
    {
      fs.stat(file, function ( err, stats ) {
        if (err)
        {
          response.writeHead(utils.getStatusCode('INTSRVERR'), {'Content-Type': 'text/html'});
          response.end('<h1>Error (500): Internal Server Error.</h1>');
          console.log(('It couldn\'t get stats for ' + file + ' (500).').red());
          return;
        }

        if (stats.size > 5 * 1048576)   // 5Mb
        {
          var stream;

          if (stats.size < 104857600) // 100Mb
          {
            stream = fs.createReadStream(file);
            stream.pipe(response);
            console.log(('File: ' + file + ' correctly sent.').green());
            return;
          }

          stream = fs.createReadStream(file, {bufferSize: 64 * 1024});
          stream.pipe(response);
          console.log(('File: ' + file + ' correctly sent.').green());

        }

        fs.readFile(file, function ( err, data ) {
          if (err)
          {
            response.writeHead(utils.getStatusCode('INTSRVERR'), {'Content-Type': 'text/html'});
            response.end('<h1>Error (500): Internal Server Error</h1>');
            console.log(('Error reading ' + file + ' .Try again.').red());
            return;
          }

          response.writeHead(utils.getStatusCode('OK'), {'Content-Type': utils.getMIME(path.extname(basefile))});
          response.end(data);
          console.log(('File: ' + file + ' correctly sent.').green());
        });
      });
      return;
    }

    response.writeHead(utils.getStatusCode('NOTFOUND'), {'Content-Type': 'text/html'});
    response.end('<h1>Error (404): ' + basefile + ' Not Found</h1>');
    console.log(('Error loading ' + file + ' (404).').red());
  });
}

function handleMethod ( request, response ) {
  if (request.method === 'GET')
  {
    console.log(('<GET>').yellow());
    loadGET(request, response);
  }
  else if (request.method === 'POST')
  {
    console.log(('This HTTP POST handler is under construction.').yellow());
  }
  else
  {
    console.error(('Error handling HTTP Method: Unknown.').red());
  }
}

module.exports.start = function () {
  http.createServer(handleMethod).listen(PORT);
  console.log(('Server started at \'http://' + IP + ':' + PORT + '\' on ' + utils.getTime().log().blue()).cyan());
};