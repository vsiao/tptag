var Consolidate = require('consolidate');
var Express = require('express');
var Game = require('./lib/Game');
var Path = require('path');

var app = Express();
app.game = new Game();

function TPTag() {
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
  var express_listen = app.listen;
  app.listen = function(port, callback) {
    var server = express_listen.call(app, port, callback);
    app.game.init(server);
    return server;
  };
  return app;
}

app.players = function(players) {
  this.game.players = players;
  this.game.actions[players[0]] = {};
  this.game.actions[players[1]] = {};
};
app.initState = function(state) {
  this.game.state = state;
};
app.begin = function(playerName, msg) {
  this.game.beginMsg[playerName] = msg;
}
app.action = function(playerName, verbs, callback) {
  if (Object.prototype.toString.call(verbs) !== '[object Array]') {
    verbs = [verbs];
  }
  for (i = 0; i < verbs.length; ++i) {
    this.game.actions[playerName][verbs[i]] = callback;
  }
};

module.exports = TPTag;
