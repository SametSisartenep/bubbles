// Application Core

var http = require('http'),
  qs = require('querystring');

var PORT = process.env.PORT || 1337;

function handleConnection ( req, res ) {
  if (req.method === 'GET') {
    console.log('GET request received.');
    res.writeHead(200, {'Content-Type' : 'text/html'});
    res.end('<h1>Welcome!</h1>');
  } else if (req.method === 'POST') {
    console.log('POST request received.');
    res.writeHead(200, {'Content-Type' : 'text/html'});
    res.end('<h1>This page is Under build</h1>');
  } else {
    console.log(req.method + ' Not Allowed. ERROR');
    res.writeHead(405, {'Content-Type' : 'text/html'});
    res.end('<h1>This request couldn\'t be handle. Sorry :(</h1>');
  }
}

var server = http.createServer(handleConnection);

server.listen(PORT, function () {
  console.log('Bubbles running at 127.0.0.1:' + PORT);
});
