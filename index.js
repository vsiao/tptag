var Consolidate = require('consolidate');
var Express = require('express');
var Game = require('./lib/Game');
var Path = require('path');
var SocketIO = require('socket.io');

var app = Express();
app.games = {};
app.socketToGame = {};
app.actions = {};
app.beginMsg = {};

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
    app.io = SocketIO.listen(server);
    app.io.sockets.on('connection', function(socket) {
      socket.on('join', function(room) {
        socket.join(room);
        if (!app.games.hasOwnProperty(room)) {
          app.games[room] = new Game(app);
        }
        app.socketToGame[socket.id] = app.games[room];
        app.games[room].add(socket);
      });
    });
    return server;
  }
  return app;
}

app.players = function(players) {
  this.initPlayers = players;
  this.actions[players[0]] = {};
  this.actions[players[1]] = {};
};
app.initState = function(state) {
  this.defaultState = state;
};
app.begin = function(playerName, msg) {
  this.beginMsg[playerName] = msg;
}
app.action = function(playerName, verbs, callback) {
  if (Object.prototype.toString.call(verbs) !== '[object Array]') {
    verbs = [verbs];
  }
  for (i = 0; i < verbs.length; ++i) {
    this.actions[playerName][verbs[i]] = callback;
  }
};

module.exports = TPTag;
