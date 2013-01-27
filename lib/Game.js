var InputParse = require('./InputParse');
var Player = require('./Player');

function clone(st) {
  var obj = {};
  var prop, p2;
  for (prop in st) {
    obj[prop] = {};
    for (p2 in st[prop]) {
      obj[prop][p2] = st[prop][p2];
    }
  }
  return obj;
}

function Game(app) {
  this.app = app;
  this.p = {};
  this.state = clone(app.defaultState);
  this.actions = app.actions;
  this.beginMsg = app.beginMsg;
}

Game.prototype.add = function(socket) {
  if (!this.player1) {
    this.player1 = new Player(this, socket);
    this.player1.name = this.app.initPlayers[0];
    this.player1.notify('Please wait for someone else to join this room...');
    this.p[this.player1.name] = this.player1;
  } else if (!this.player2) {
    this.player2 = new Player(this, socket);
    this.player2.name = this.app.initPlayers[1];
    this.player1.notify('Excellent! Let\'s begin...');
    this.p[this.player2.name] = this.player2;
    this.startGame();
  } else {
    socket.emit('message', 'This game is full! Go away.');
  }
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
  this.player1.notify(msg);
  this.player2.notify(msg);
};

Game.prototype.processInput = function(player, input) {
  if (!this.player2) {
    player.notify('The game hasn\'t started yet! Wait for another player.');
    return;
  }
  var req = new InputParse(player, input);
  req.game = this;
  if (req.action && this.actions[player.name][req.action]) {
    this.actions[player.name][req.action](req, this.state);
  } else {
    player.notify('What? I don\'t understand you. At all.');
  }
};

module.exports = Game;
