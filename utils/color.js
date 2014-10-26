var x256 = require('x256');

function paint ( text, rgb ) {
  return '\x1b[38;5;' + x256(rgb[0], rgb[1], rgb[2]) + 'm' + text + '\x1b[0m';
}

module.exports.loadColors = function () {
  //********** COLORS
  String.prototype.black = function () {
    return paint(this, [0, 0, 0]);
  };

  String.prototype.white = function () {
    return paint(this, [255,255,255]);
  };

  String.prototype.red = function () {
    return paint(this, [255, 0, 0]);
  };

  String.prototype.green = function () {
    return paint(this, [0, 255, 0]);
  };

  String.prototype.yellow = function () {
    return paint(this, [255, 255, 0]);
  };

  String.prototype.blue = function () {
    return paint(this, [0, 0, 255]);
  };

  String.prototype.magenta = function () {
    return paint(this, [255, 0, 255]);
  };

  String.prototype.cyan = function () {
    return paint(this, [0, 255, 255]);
  };

  String.prototype.rgb = function ( r, g, b ) {
    return paint(this, [r, g, b]);
  }
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