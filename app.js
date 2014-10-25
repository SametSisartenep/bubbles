// Modules
var utils = require('./utils'),
  http = require('http'),
  qs = require('querystring'),
  path = require('path'),
  fs = require('fs');

// Global variables
var  IP = '127.0.0.1',
  basefile = '',
  time0 = 0;

utils.loadColors();

function streamFile ( file, request, response, is_big ) {
  var stream,
    frame;

  response.writeHead(utils.getStatusCode('OK'), {
    'Content-Type': utils.getMIME(path.extname(basefile))
  });

  if (is_big)
  {
    stream = fs.createReadStream(file, {bufferSize: 64 * 1024});
  }
  else
  {
    stream = fs.createReadStream(file);
  }

  stream.pipe(response);
  utils.logHTTP(request.method, 200, file + ' ' + (new Date() - time0) + 'ms');
}

function checkFileAndServe ( file, request, response ) {
  fs.exists(file, function ( exists ) {
    if (exists)
    {
      stats(file, request, response);
    }
    else
    {
      response.writeHead(utils.getStatusCode('NOTFOUND'), {'Content-Type': 'text/html'});
      response.end('<h1>Error (404): ' + basefile + ' Not Found</h1>');
      utils.logHTTP(request.method, 404, file + ' ' + (new Date() - time0) + 'ms');
    }
  });
}

function stats ( file, request, response ) {
  fs.stat(file, function ( err, stats ) {
    if (err)
    {
      response.writeHead(utils.getStatusCode('INTSRVERR'), {'Content-Type': 'text/html'});
      response.end('<h1>Error (500): Internal Server Error.</h1>');
      utils.logHTTP(request.method, 500, file + ' ' + (new Date() - time0) + 'ms');
    }
    else
    {
      streamFile(file, request, response, (stats.size >= 104857600));
    }
  });
}

function loadGET ( request, response ) {
  var file = decodeURI(request.url);
  file = file === '/' ? './www/index.html' : './www' + file;

  basefile = path.basename(file) || 'index.html';

  //cliIP = request.connection.remoteAddress;

  checkFileAndServe(file, request, response);
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

    // Clean cache
    requestBody = formData = null;
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