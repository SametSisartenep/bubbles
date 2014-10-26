var x256 = require('x256');

function paint ( text, rgb ) {
  return '\x1b[38;5;' + x256(rgb[0], rgb[1], rgb[2]) + 'm' + text + '\x1b[0m';
}

module.exports.loadColors = function () {
  //********** COLORS
  String.prototype.rgb = function ( r, g, b ) {
    return paint(this, [r, g, b]);
  };

  String.prototype.__defineGetter__('black', function () {
    return this.rgb(0, 0, 0);
  });

  String.prototype.__defineGetter__('white', function () {
    return this.rgb(255, 255, 255);
  });

  String.prototype.__defineGetter__('red', function () {
    return this.rgb(255, 0, 0);
  });

  String.prototype.__defineGetter__('green', function () {
    return this.rgb(0, 255, 0);
  });

  String.prototype.__defineGetter__('blue', function () {
    return this.rgb(0, 0, 255);
  });

  String.prototype.__defineGetter__('yellow', function () {
    return this.rgb(255, 255, 0);
  });

  String.prototype.__defineGetter__('magenta', function () {
    return this.rgb(255, 0, 255);
  });

  String.prototype.__defineGetter__('cyan', function () {
    return this.rgb(0, 255, 255);
  });
  //********** STYLES
  /*String.prototype.bold = function () {
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
  };*/
};