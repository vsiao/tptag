function Game(io, description) {
  this.io = io;
  io.sockets.on('connection', function(socket) {
    console.log('Player connected');
  });
}

module.exports = Game;
