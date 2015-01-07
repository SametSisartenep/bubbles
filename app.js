var express = require('express'),
  handlebars = require('express-handlebars').create({
    defaultLayout: 'main',
    helpers: {
      section: function ( name, options ) {
        if (!this._sections) {
          this._sections = {};
        }
        this._sections[name] = options.fn(this);
        return null;
      }
    }
  });

var bubbles = express();

bubbles.set('port', process.env.PORT || 1337);

bubbles.engine('handlebars', handlebars.engine);
bubbles.set('view engine', 'handlebars');

bubbles.use(function ( req, res, next ) {
  res.set('X-Powered-By', 'Bubbles\' Team');

  next();
});

bubbles.get('/', function ( req, res ) {
  res.render('hall');
});

bubbles.get('/2d', function ( req, res ) {
  res.render('2d/hall', { context2d: true });
});

bubbles.use(function ( req, res ) {
  res.status(404);
  res.render('404');
});

bubbles.use(function ( req, res ) {
  res.status(500);
  res.render('500');
});

bubbles.use(express.static(__dirname + '/www'));

bubbles.listen(bubbles.get('port'), function () {
  console.log('Bubbles running at 127.0.0.1:' + bubbles.get('port'));
});

process.on('SIGINT', function () {
  console.log('Bubbles is closing...');
  process.exit(1);
});
