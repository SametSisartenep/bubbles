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