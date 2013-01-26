var Consolidate = require('consolidate');
var Express = require('express');
var Game = require('./lib/Game');
var Path = require('path');

var app = Express();

app.configure(function() {
  app.use(Express.json());
  app.use(Express.static(Path.join(__dirname, 'public')));
  app.engine('html', Consolidate.handlebars);
  app.set('views', Path.join(__dirname, 'views'));
  app.set('view engine', 'html');
});

app.get('/', function(req, res) {
  res.render('index');
});

module.exports = function(description) {
  var express_listen = app.listen;
  app.listen = function(port, callback) {
    var server = express_listen.call(app, port, callback);
    new Game(server, description);
    return server;
  };
  app.hello = function() { console.log('hello world!'); };
  return app;
}
