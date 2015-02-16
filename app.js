var express = require('express'),
  formidable = require('formidable'),
  morgan = require('morgan'),
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

var mysql = require('./db/mysql');
mysql.describeUsers(function ( err, results ) {
  if (err) {
    console.error('Database error.');
    return;
  }
  console.log(results);
});

bubbles.use(function ( req, res, next ) {
  res.set('X-Powered-By', 'Bubbles\' Team');

  next();
});

bubbles.use(morgan('dev'));

bubbles.get('/', function ( req, res ) {
  res.render('hall');
});

bubbles.get('/2d', function ( req, res ) {
  res.render('2d/hall', { context2d: true });
});

bubbles.get('/thank-you', function ( req, res ) {
  res.render('thank-you', { layout: null });
});

bubbles.use(express.static(__dirname + '/www'));

bubbles.post('/sign-up', function ( req, res ) {
  var form = new formidable.IncomingForm();
  form.parse(req, function ( err, fields ) {
    if (err) {
      console.error('Form handling error');
    }
    console.log('Received fields: ' + JSON.stringify(fields));
    res.redirect(303, '/thank-you');
  });
});

bubbles.use(function ( req, res ) {
  res.status(404);
  res.render('error/404', { error: true });
});

bubbles.use(function ( req, res ) {
  res.status(500);
  res.render('error/500', { error: true });
});

bubbles.listen(bubbles.get('port'), function () {
  console.log('Bubbles running at 127.0.0.1:' + bubbles.get('port'));
});

process.on('SIGINT', function () {
  console.log('\nBubbles is closing...');
  process.exit(1);
});
