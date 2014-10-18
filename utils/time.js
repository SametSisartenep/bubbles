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