var SocketIO = require('socket.io');

function Game(server, description) {
  this.io = SocketIO.listen(server);
  this.io.sockets.on('connection', function(socket) {
    console.log('Player connected');
  });
}

module.exports = Game;
