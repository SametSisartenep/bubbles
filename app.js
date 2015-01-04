var express = require('express'),
  handlebars = require('express-handlebars').create({
    defaultLayout: 'main'
  });

var bubbles = express();

bubbles.set('port', process.env.PORT || 1337);

bubbles.engine('handlebars', handlebars.engine);
bubbles.set('view engine', 'handlebars');

bubbles.use(function ( req, res, next ) {
  res.set('X-Powered-By', 'Cats After All, Inc');

  next();
});

bubbles.get('/', function ( req, res ) {
  res.type('text/html');
  res.sendFile( __dirname + '/www/index.html');
});

bubbles.listen(bubbles.get('port'), function () {
  console.log('Bubbles running at 127.0.0.1:' + bubbles.get('port'));
});
