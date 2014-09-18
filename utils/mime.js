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

function error ( message ) {
	this.message = typeof message === 'string' ? message : message.toString();
}

module.exports.getMIME = function ( file_extension ) {
	if (file_extension.length > 5)
	{
		throw error(file_extension + " doesn't exist");
		return;
	}
	if (file_extension === "" || file_extension === " ")
	{
		throw error("No extension defined");
		return;
	}