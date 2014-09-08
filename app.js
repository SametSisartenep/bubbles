var mime = require('./mime-types');
var htst = require('./http-stats');
var http = require('http');
var path = require('path');
var fs = require('fs');

var PORT = 1337;
var IP = '127.0.0.1';

function Time () { this.now = new Date(); }

Time.prototype = {
	day: function () {
		var d = this.now.getDate();
		return d < 10 ? '0' + d : d;
	},
	month: function () {
		var m = this.now.getMonth();
		return m < 10 ? '0' + m : m;
	},
	year: function () {
		return this.now.getFullYear();
	},
	hour: function () {
		var hh = this.now.getHours();
		return hh < 10 ? '0' + hh : hh;
	},
	minute: function () {
		var mm = this.now.getMinutes();
		return mm < 10 ? '0' + mm : mm;
	},
	second: function () {
		var ss = this.now.getSeconds();
		return ss < 10 ? '0' + ss : ss;
	}
};

function onRequest ( request, response ) {
	var file = decodeURI(request.url);
	file = file === "/" ? 'www/index.html' : './www' + file;

	var basefile = path.basename(file) || 'index.html';

	fs.exists(file, function ( exists ) {
		if (exists)
		{
			fs.stat(file, function ( err, stats ) {
				if (err)
				{
					response.writeHead(htst.getStatusCode("INTSRVERR"), {"Content-Type": 'text/html'});
					response.end("<h1>Error (500): Internal Server Error.</h1>");
					console.log("It couldn't get stats for " + file + " (500).");
					return;
				}

				if (stats.size > 5 * 1048576 && stats.size < 104857600) // 5Mb, 100Mb respectively.
				{
					var stream = fs.createReadStream(file);
					stream.pipe(response);
					console.log("File: " + file + " correctly sent.");
					return;
				}
				if (stats.size >= 104857600)
				{
					var stream = fs.createReadStream(file, {bufferSize: 64 * 1024});
					stream.pipe(response);
					console.log("File: " + file + " correctly sent.");
					return;
				}

				fs.readFile(file, function ( err, data ) {
					if (err)
					{
						response.writeHead(htst.getStatusCode("INTSRVERR"), {"Content-Type": 'text/html'});
						response.end("<h1>Error (500): Internal Server Error</h1>");
						console.log("Error reading " + file + " .Try again.");
						return;
					}

					response.writeHead(htst.getStatusCode("OK"), {"Content-Type": mime.getMIME(path.extname(basefile))});
					response.end(data);
					console.log("File: " + file + " correctly sent.");
				});
			});
			return;
		}

		response.writeHead(htst.getStatusCode("NOTFOUND"), {"Content-Type": 'text/html'});
		response.end("<h1>Error (404): " + file + " Not Found</h1>");
		console.log("Error loading " + file + " (404).");
	});
}

module.exports.start = function () {
	http.createServer(onRequest).listen(PORT);
	console.log("Server started at \"http://" + IP + ":" + PORT + "\"");
}