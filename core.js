// Application Core

var http = require('http'),
  fs = require('fs'),
  util = require('util');

var routes = require('./routes');

function sendFile ( file, res ) {
  fs.exists(file, function ( exist ) {
    if (exist) {
      fs.readFile(file, function ( err, data ) {
        res.writeHead(200, {'Content-Type' : 'text/html'});
        res.end(data);
      });

      util.log('File: ' + file + ' correctly sent.');
    } else {
      util.log(file + ' not found. 404');
      res.writeHead(404, {'Content-Type' : 'text/html'});
      res.end('<h1>ERROR 404. File [' + file + '] NOT FOUND</h1>');
    }
  });
}

function findFileRoute ( file ) {
  for (var route in routes) {
    if (route === file) {
      util.log('File: ' + route + ' found.');
      return routes[route];
    }
  }
  return false;
}

function handleConnection ( req, res ) {
  var file = '';

  file = findFileRoute(req.url);

  if (req.method === 'GET') {
   
    if (!file) {
      util.log(file + ' not found. 404');
      res.writeHead(404, {'Content-Type' : 'text/html'});
      res.end('<h1>ERROR 404.' + req.url + ' NOT FOUND</h1>');
    } else {
      sendFile(file, res);
    }
  } else if (req.method === 'POST') {
    util.log('POST request received.');
    res.writeHead(200, {'Content-Type' : 'text/html'});
    res.end('<h1>This service is under development. Sorry :(</h1>');
  } else if (req.method === 'PUT') {
    util.log('PUT request received.');
    res.writeHead(200, {'Content-Type' : 'text/html'});
    res.end('<h1>This service is under development. Sorry :(</h1>');
  } else if (req.method === 'DELETE') {
    util.log('DELETE request received.');
    res.writeHead(200, {'Content-Type' : 'text/html'});
    res.end('<h1>This service is under development. Sorry :(</h1>');
  } else {
    util.log(req.method + ' request received.');
    res.writeHead(405, {'Content-Type' : 'text/html'});
    res.end('<h1>ERROR 405. Method ' + req.method + ' Not Allowed</h1>');
  }
}

var AppCore = function AppCore () {
  this.PORT = 1337;
  this.server = {};
};

AppCore.prototype.start = function start ( port ) {
  var PORT = (this.PORT = port || this.PORT);

  this.server = http.createServer(handleConnection).listen(PORT, function () {
    util.log('Bubbles running at 127.0.0.1:' + PORT);
  });
};

module.exports = exports = new AppCore();
