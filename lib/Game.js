var InputParse = require('./InputParse');
var Player = require('./Player');
var SocketIO = require('socket.io');

function Game(server) {
  this.states = [];
  this.actions = {};
  if (typeof server !== 'undefined') {
    this.init(server);
  }
}

Game.prototype.init = function(server) {
  this.io = SocketIO.listen(server);
  var self = this;
  this.io.sockets.on('connection', function(socket) {
    if (!self.player1) {
      self.player1 = new Player(socket);
    } else if (!self.player2) {
      self.player2 = new Player(socket);
    } else {
      socket.emit('message', 'This game is full! Go away.');
    }
  });
}

Game.prototype.processInput = function(player, input) {
  var req = new TPInputParse(player, input);
  if (req.action && this.actions[req.action]) {
    this.actions[req.action](req, this);
  } else {
    player.notify('What? I don\'t understand you. At all.');
  }
};

module.exports = Game;
