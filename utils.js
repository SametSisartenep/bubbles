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
    },
    log: function () {
        return (this.day() + '/' + this.month() + '/' + this.year() + '|' + this.hour() + ':' + this.minute() + ':' + this.second());
    }
};

module.exports.getTime = function () {
    return new Time();
};

var TINYHTTP = {
    'CONTINUE' : 100,
    'SWTPROTO' : 101,
    'OK' : 200,
    'CREATED' : 201,
    'ACCEPTED' : 202,
    'NAUTHINFO' : 203,
    'NOCONTENT' : 204,
    'RTCONTENT' : 205,
    'PTCONTENT' : 206,
    'MULCHOICE' : 300,
    'MOVPERMNT' : 301,
    'FOUND' : 302,
    'SEEOTHER' : 303,
    'NOTMODIFY' : 304,
    'USEPROXY' : 305,
    'TEMPREDIR' : 307,
    'BADREQUEST' : 400,
    'UNAUTHRIZD' : 401,
    'PAYREQURD' : 402,
    'FORBIDDEN' : 403,
    'NOTFOUND' : 404,
    'MTHDNOTALW' : 405,
    'NOTACCEPT' : 406,
    'PROXYAUTHR' : 407,
    'REQTIMEOUT' : 408,
    'CONFLICT' : 409,
    'GONE' : 410,
    'LENGTHREQ' : 411,
    'PRECONFAIL' : 412,
    'REQENTLARG' : 413,
    'REQURILONG' : 414,
    'UNSUPMEDIA' : 415,
    'REQRANGENS' : 416,
    'EXPECTFAIL' : 417,
    'INTSRVERR' : 500,
    'NOTIMPLMNT' : 501,
    'BADGATEWAY' : 502,
    'UNAVAILSRV' : 503,
    'GATETIMEOUT' : 504,
    'HTTPNOTSUP' : 505
},
HTTP = {
    'CONTINUE' : 100,
    'SWITCHPROTO' : 101,
    'OK' : 200,
    'CREATED' : 201,
    'ACCEPTED' : 202,
    'NONAUTHINFOR' : 203,
    'NOCONTENT' : 204,
    'RESETCONTENT' : 205,
    'PARTIALCONTENT' : 206,
    'MULTIPLCHOICES' : 300,
    'MOVEDPERMNTLY' : 301,
    'FOUND' : 302,
    'SEEOTHER' : 303,
    'NOTMODIFIED' : 304,
    'USEPROXY' : 305,
    'TEMPREDIR' : 307,
    'BADREQUEST' : 400,
    'UNAUTHORIZED' : 401,
    'PAYREQUIRED' : 402,
    'FORBIDDEN' : 403,
    'NOTFOUND' : 404,
    'METHODNOTALLOWED' : 405,
    'NOTACCEPTABLE' : 406,
    'PROXYAUTHREQUIRED' : 407,
    'REQTIMEOUT' : 408,
    'CONFLICT' : 409,
    'GONE' : 410,
    'LENGTHREQUIRED' : 411,
    'PRECONDFAILED' : 412,
    'REQENTITYTOOLARG' : 413,
    'REQURITOOLONG' : 414,
    'UNSUPMEDIATYPE' : 415,
    'REQRANGENOTSATISFIABLE' : 416,
    'EXPECTFAILED' : 417,
    'INTERNSERVERERROR' : 500,
    'NOTIMPLEMENTED' : 501,
    'BADGATEWAY' : 502,
    'UNAVAILABLESERVICE' : 503,
    'GATETIMEOUT' : 504,
    'HTTPVERNOTSUPPORTED' : 505
};

module.exports.getStatusCode = function ( status, tiny ) {
    tiny = typeof tiny === 'undefined' ? true : tiny;
    
    if (tiny)
    {
        return TINYHTTP[status];
    }

    return HTTP[status];
};

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

function error ( msg ) {
    this.message = typeof msg === 'string' ? msg : msg.toString();
}

module.exports.getMIME = function ( file_extension ) {
    if (file_extension.length > 5)
    {
        throw error(file_extension + ' doesn\'t exist');
    }
    if (file_extension === '' || file_extension === ' ')
    {
        throw error('No extension defined');
    }

    return MIME[file_extension];
};

var COLOR = {
    black: '\x1b[0;30m',
    white: '\x1b[0;37m',
    red: '\x1b[0;31m',
    green: '\x1b[0;32m',
    yellow: '\x1b[0;33m',
    blue: '\x1b[0;34m',
    magenta: '\x1b[0;35m',
    cyan: '\x1b[0;36m',
    reset: '\x1b[0m'
};

function paint ( text, color ) {
    return color + text + COLOR.reset;
}

module.exports.loadColors = function () {
    //********** COLORS
    String.prototype.black = function () {
        return paint(this, COLOR.black);
    };

    String.prototype.white = function () {
        return paint(this, COLOR.white);
    };

    String.prototype.red = function () {
        return paint(this, COLOR.red);
    };

    String.prototype.green = function () {
        return paint(this, COLOR.green);
    };

    String.prototype.yellow = function () {
        return paint(this, COLOR.yellow);
    };

    String.prototype.blue = function () {
        return paint(this, COLOR.blue);
    };

    String.prototype.magenta = function () {
        return paint(this, COLOR.magenta);
    };

    String.prototype.cyan = function () {
        return paint(this, COLOR.cyan);
    };
    //********** STYLES
    String.prototype.bold = function () {
        return this.replace(new RegExp('[\\[][0-9][;]'), '[1;');
    };

    String.prototype.dim = function () {
        return this.replace(new RegExp('[\\[][0-9][;]'), '[2;');
    };

    String.prototype.underscore = function () {
        return this.replace(new RegExp('[\\[][0-9][;]'), '[4;');
    };

    String.prototype.blink = function () {
        return this.replace(new RegExp('[\\[][0-9][;]'), '[5;');
    };

    String.prototype.reverse = function () {
        return this.replace(new RegExp('[\\[][0-9][;]'), '[7;');
    };

    String.prototype.invisible = function () {
        return this.replace(new RegExp('[\\[][0-9][;]'), '[8;');
    };
};