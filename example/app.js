var Consolidate = require('consolidate');
var Express = require('express');
var Game = require('../');
var Path = require('path');
var SocketIO = require('socket.io');

var app = Express();
app.configure(function() {
  app.use(Express.json());
  app.use(Express.static(Path.join(__dirname, 'public')));
  app.engine('html', Consolidate.handlebars);
  app.set('views', Path.join(__dirname, 'views'));
  app.set('view engine', 'html');
});

var port = process.env.PORT || 8080;
var server = app.listen(port, function() {
  console.log('Listening on port %d in %s mode', port, app.settings.env);
});

new Game(SocketIO.listen(server), {});
app.get('/', function(req, res) {
  res.render('index');
});
