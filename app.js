// Modules
var utils = require('./utils'),
  http = require('http'),
  qs = require('querystring'),
  path = require('path'),
  fs = require('fs');

// Global variables
var PORT = 1337,
  IP = '127.0.0.1';

utils.loadColors();

function loadGET ( request, response ) {
  var file = decodeURI(request.url);
  file = file === '/' ? './www/index.html' : './www' + file;

  var basefile = path.basename(file) || 'index.html';

  var cliIP = request.connection.remoteAddress;

  console.log('[' + cliIP.yellow() + '] requests file: ' + file);

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

function loadPOST ( request, response ) {
  var requestBody = '';

  request.on('data', function (data) {
    requestBody += data;

    if (requestBody.length > 1e7)
    {
      response.writeHead(utils.getStatusCode('REQENTLARG'), 'Request Entity Too Large', {'Content-Type' : 'text/html'});
      response.end('<h1>Error (413): Request Entity Too Large.</h1>');
      console.log('Error while processing POST data (413).'.red());
    }
  });

  request.on('end', function () {
    var formData = qs.parse(requestBody);
    console.log(('Received data: ' + requestBody).cyan());

    response.writeHead(utils.getStatusCode('OK'), {'Content-Type' : 'text/html'});
    response.write('<h1>POST handling still under construction.</h1>');
    response.write('<p> Your name: ' + formData.name + '</p>');
    response.write('<p> Your surname: ' + formData.surname + '</p>');
    response.write('<p> Your birthdate: ' + formData.birth + '</p>');
    response.write('<p> Your email: ' + formData.email + '</p>');
    response.end('<p> Your sex: ' + formData.sex + '</p>');
  });
}

function handleMethod ( request, response ) {
  console.log(('<'+request.method+'>' + utils.getTime().log().blue()).yellow());

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
    console.error(('Error handling HTTP Method: ' + request.method + '.').red());
    response.writeHead(utils.getStatusCode('NOTIMPLMNT'), {'Content-Type' : 'text/html'});
    response.end('<h1>Error (501): HTTP Method Not Implemented</h1>');
  }
}

module.exports.start = function () {
  http.createServer(handleMethod).listen(PORT);
  console.log(('Server started at \'http://' + IP + ':' + PORT + '\' on ' + utils.getTime().log().blue()).cyan());
};