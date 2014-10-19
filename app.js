// Modules
var utils = require('./utils'),
  http = require('http'),
  qs = require('querystring'),
  path = require('path'),
  fs = require('fs');

// Global variables
var  IP = '127.0.0.1',
  time0 = 0;

utils.loadColors();

function loadGET ( request, response ) {
  var file = decodeURI(request.url);
  file = file === '/' ? './www/index.html' : './www' + file;

  var basefile = path.basename(file) || 'index.html';

  var cliIP = request.connection.remoteAddress;

  fs.exists(file, function ( exists ) {
    if (exists)
    {
      fs.stat(file, function ( err, stats ) {
        if (err)
        {
          response.writeHead(utils.getStatusCode('INTSRVERR'), {'Content-Type': 'text/html'});
          response.end('<h1>Error (500): Internal Server Error.</h1>');
          utils.logHTTP(request.method, 500, file + ' ' + (new Date() - time0) + 'ms');
          return;
        }

        if (stats.size > 5 * 1048576)   // 5Mb
        {
          var stream;

          if (stats.size < 104857600) // 100Mb
          {
            stream = fs.createReadStream(file);
            stream.pipe(response);
            utils.logHTTP(request.method, 200, file + ' ' + (new Date() - time0) + 'ms');
            return;
          }

          stream = fs.createReadStream(file, {bufferSize: 64 * 1024});
          stream.pipe(response);
          utils.logHTTP(request.method, 200, file + ' ' + (new Date() - time0) + 'ms');

        }

        fs.readFile(file, function ( err, data ) {
          if (err)
          {
            response.writeHead(utils.getStatusCode('INTSRVERR'), {'Content-Type': 'text/html'});
            response.end('<h1>Error (500): Internal Server Error</h1>');
            utils.logHTTP(request.method, 500, file + ' ' + (new Date() - time0) + 'ms');
            return;
          }

          response.writeHead(utils.getStatusCode('OK'), {'Content-Type': utils.getMIME(path.extname(basefile))});
          response.end(data);
          utils.logHTTP(request.method, 200, file + ' ' + (new Date() - time0) + 'ms');
        });
      });
      return;
    }

    response.writeHead(utils.getStatusCode('NOTFOUND'), {'Content-Type': 'text/html'});
    response.end('<h1>Error (404): ' + basefile + ' Not Found</h1>');
    utils.logHTTP(request.method, 404, file + ' ' + (new Date() - time0) + 'ms');
  });
}

function loadPOST ( request, response ) {
  var requestBody = '';

  request.on('data', function (data) {
    requestBody += data;

    if (requestBody.length > 1e7)
    {
      response.writeHead(utils.getStatusCode('REQENTLARG'), 'Request Entity Too Large', {'Content-Type' : 'text/html'});
      response.end('<h1>Error (413): Request Entity Too Large.</h1>');
      utils.logHTTP(request.method, 413, 'Request Entity Too Large' + ' ' + (new Date() - time0) + 'ms');
    }
  });

  request.on('end', function () {
    var formData = qs.parse(requestBody);

    response.writeHead(utils.getStatusCode('OK'), {'Content-Type' : 'text/html'});
    response.write('<h1>POST handling still under construction.</h1>');
    response.write('<p> Your name: ' + formData.name + '</p>');
    response.write('<p> Your surname: ' + formData.surname + '</p>');
    response.write('<p> Your birthdate: ' + formData.birth + '</p>');
    response.write('<p> Your email: ' + formData.email + '</p>');
    response.end('<p> Your sex: ' + formData.sex + '</p>');

    utils.logHTTP(request.method, 200, requestBody + ' ' + (new Date() - time0) + 'ms');
  });
}

function handleMethod ( request, response ) {
  time0 = new Date();

  if (request.method === 'GET')
  {
    loadGET(request, response);
  }
  else if (request.method === 'POST')
  {
    loadPOST(request, response);
  }
  else
  {
    response.writeHead(utils.getStatusCode('NOTIMPLMNT'), {'Content-Type' : 'text/html'});
    response.end('<h1>Error (501): HTTP Method Not Implemented</h1>');
    utils.logHTTP(request.method, 501, 'Method Not Implemented');
  }
}

module.exports.start = function ( port ) {
  http.createServer(handleMethod).listen(port);
  console.log(('Server started at \'http://' + IP + ':' + port + '\' on ' + utils.getTime().log().blue()).cyan());
};