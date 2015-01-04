var express = require('express');

var bubbles = express();

bubbles.set('port', process.env.PORT || 1337);

bubbles.use(function ( req, res, next ) {
  res.set('X-Powered-By', 'Cats After All, Inc');

  next();
});

bubbles.get('/', function ( req, res ) {
  res.type('text/html');
  res.send('<h1>Welcome to Bubbles v0.1.0!</h1>' +
          '<p> Well, I\'m kidding, but It\'ll be soon ;)</p>');
});

bubbles.listen(bubbles.get('port'), function () {
  console.log('Bubbles running at 127.0.0.1:' + bubbles.get('port'));
});
