var InputParse = require('./InputParse');
var Player = require('./Player');
var SocketIO = require('socket.io');

function Game(server) {
  this.state = {};
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
      self.player1 = new Player(self, socket);
      self.player1.id = 0;
    } else if (!self.player2) {
      self.player2 = new Player(self, socket);
      self.player2.id = 1;
    } else {
      socket.emit('message', 'This game is full! Go away.');
    }
  });
};

Game.prototype.announce = function(msg) {
  this.player1.emit('message', msg);
  this.player2.emit('message', msg);
};

Game.prototype.processInput = function(player, input) {
  var req = new InputParse(player, input);
  req.game = this;
  if (req.action && this.actions[req.action]) {
    console.log(this.state);
    this.actions[req.action](req, this.state);
  } else {
    player.notify('What? I don\'t understand you. At all.');
  }
};

module.exports = Game;
