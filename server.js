var http = require('http');
var path = require('path');
var fs = require('fs');

var PORT = 1337;
var MIME = {
	// CODE
	'.html' : 'text/html',
	'.htm' : 'text/html',
	'.stm' : 'text/html',
	'.css' : 'text/css',
	'.js' : 'application/javascript',
	// FILES
	'.gtar' : 'application/x-gtar',
	'.gz' : 'application/x-gzip',
	'.pdf' : 'application/x-pdf',
	'.tar' : 'application/x-tar',
	'.tgz' : 'application/x-compressed',
	'.z' : 'application/x-compress',
	'.zip' : 'application/zip',
	// IMAGE
	'.gif' : 'image/gif',
	'.ico' : 'image/x-icon',
	'.jpe' : 'image/jpeg',
	'.jpeg' : 'image/jpeg',
	'.jpg' : 'image/jpeg',
	'.svg' : 'image/svg+xml',
	'.tif' : 'image/tiff',
	'.tiff' : 'image/tiff',
	'.png' : 'image/png',
	// AUDIO
	'.mid' : 'audio/mid',
	'.rmi' : 'audio/mid',
	'.mp3' : 'audio/mpeg',
	'.wav' : 'audio/x-wav',
	// VIDEO
	'.mov' : 'video/quicktime',
	'.mp2' : 'video/mpeg',
	'.mpa' : 'video/mpeg',
	'.mpe' : 'video/mpeg',
	'.mpeg' : 'video/mpeg',
	'.mpg' : 'video/mpeg',
	'.qt' : 'video/quicktime'

};

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
	var file = path.basename(decodeURI(request.url));

	response.writeHead(200, {'Content-Type': 'text/html'});
	response.end("<h1>File type: " + MIME[path.extname(filetype)] + "</h1>");
}

http.createServer(onRequest).listen(PORT);

console.log("Server started at \"http://127.0.0.1:" + PORT + "\"");