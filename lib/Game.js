var InputParse = require('./InputParse');
var Player = require('./Player');
var SocketIO = require('socket.io');

function Game(server) {
  this.p = {};
  this.state = {};
  this.actions = {};
  this.beginMsg = {};
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
      self.player1.name = self.players[0];
      self.p[self.player1.name] = self.player1;
    } else if (!self.player2) {
      self.player2 = new Player(self, socket);
      self.player2.name = self.players[1];
      self.p[self.player2.name] = self.player2;
      self.startGame();
    } else {
      socket.emit('message', 'This game is full! Go away.');
    }
  });
};

Game.prototype.startGame = function() {
  var name;
  for (name in this.p) {
    if (this.p.hasOwnProperty(name) && this.beginMsg.hasOwnProperty(name)) {
      this.p[name].notify(this.beginMsg[name]);
    }
  }
};

Game.prototype.announce = function(msg) {
  this.player1.emit('message', msg);
  this.player2.emit('message', msg);
};

Game.prototype.processInput = function(player, input) {
  if (!this.player2) {
    player.notify('The game hasn\'t started yet! Wait for another player.');
    return;
  }
  var req = new InputParse(player, input);
  req.game = this;
  if (req.action && this.actions[player.name][req.action]) {
    console.log(this.state);
    this.actions[player.name][req.action](req, this.state);
  } else {
    player.notify('What? I don\'t understand you. At all.');
  }
};

module.exports = Game;
