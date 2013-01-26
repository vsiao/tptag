function displayMsg(msg) {
  var idx = 0;
  var el = $('<li />');
  if (msg.length) {
    function gen() {
      el.append(msg[idx++]);
      if (idx < msg.length) {
        setTimeout(gen, 10);
      }
    }
    gen();
  }
  return el;
}

var socket = io.connect(window.location.origin);
socket.on('connect', function() {
  socket.on('message', function(msg) {
    $('#messages').append(displayMsg(msg));
  });
  $('#userInput').keyup(function(event) {
    switch (event.keyCode) {
      case 13: // ENTER
        socket.emit('input', $('#userInput').val());
        break;
    }
  });
});
