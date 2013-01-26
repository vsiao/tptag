function Player(game, socket) {
  this.socket = socket;
  var self = this;
  this.socket.on('input', function(input) {
    game.processInput(self, input);
  });
}

Player.prototype.notify = function(msg) {
  this.socket.emit('message', msg);
};

module.exports = Player;
