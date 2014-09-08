var COLOR = {
	black: "\033[0;30m",
	white: "\033[0;37m",
	red: "\033[0;31m",
	green: "\033[0;32m",
	yellow: "\033[0;33m",
	blue: "\033[0;34m",
	magenta: "\033[0;35m",
	cyan: "\033[0;36m",
	reset: "\033[0m"
}

module.exports.load = function () {
	// COLORS
	String.prototype.black = function () {
		return COLOR.black + this + COLOR.reset;
	}

	String.prototype.white = function () {
		return COLOR.white + this + COLOR.reset;
	}

	String.prototype.red = function () {
		return COLOR.red + this + COLOR.reset;
	}

	String.prototype.green = function () {
		return COLOR.green + this + COLOR.reset;
	}

	String.prototype.yellow = function () {
		return COLOR.yellow + this + COLOR.reset;
	}

	String.prototype.blue = function () {
		return COLOR.blue + this + COLOR.reset;
	}

	String.prototype.magenta = function () {
		return COLOR.magenta + this + COLOR.reset;
	}

	String.prototype.cyan = function () {
		return COLOR.cyan + this + COLOR.reset;
	}
}