var http = require('http');
var path = require('path');

var PORT = 1337;

function onRequest ( request, response ) {

}

http.createServer(onRequest).listen(PORT);

console.log("Server started at \"http://127.0.0.1:" + PORT + "\"");