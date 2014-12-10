// Application Core

var http = require('http'),
  qs = require('querystring'),
  fs = require('fs');

var PORT = process.env.PORT || 1337;

var routes = require('./routes.json');

function sendFile ( file, res ) {
  fs.exists(file, function ( exist ) {
    if (exist) {
      fs.readFile(file, function ( err, data ) {
        res.writeHead(200, {'Content-Type' : 'text/html'});
        res.end(data);
      });

      console.log('File: ' + file + ' correctly sent.');
    } else {
      console.log(file + ' not found. 404');
      res.writeHead(404, {'Content-Type' : 'text/html'});
      res.end('<h1>ERROR 404. File [' + file + '] NOT FOUND</h1>');
    }
  });
}

function handleConnection ( req, res ) {
  var file = '';

  if (req.method === 'GET') {
    for (var route in routes) {
      if (route === req.url) {
        console.log('File: ' + route + ' found.');
        file = routes[route];
        break;
      } else {
        console.log('File: ' + req.url + ' not found.');
        file = false;
      }
    }

    if (!file) {
      console.log(file + ' not found. 404');
      res.writeHead(404, {'Content-Type' : 'text/html'});
      res.end('<h1>ERROR 404.' + req.url + ' NOT FOUND</h1>');
    } else {
      sendFile(file, res);
    }
  } else if (req.method === 'POST') {
    console.log('POST request received.');
    res.writeHead(200, {'Content-Type' : 'text/html'});
    res.end('<h1>This service is under development. Sorry :(</h1>');
  } else {
    console.log(req.method + ' request received.');
    res.writeHead(405, {'Content-Type' : 'text/html'});
    res.end('<h1>ERROR 405. Method ' + req.method + ' Not Allowed</h1>');
  }
}

var server = http.createServer(handleConnection);

server.listen(PORT, function () {
  console.log('Bubbles running at 127.0.0.1:' + PORT);
});
