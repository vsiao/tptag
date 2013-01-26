function displayMsg(msg) {
  var idx = 0;
  var el = $('<li />');
  if (msg.length) {
    function gen() {
      if (msg[idx] == "\n"){
        el.append('<br /><br />');
        ++ idx;
      } else {
        el.append(msg[idx++]);
      }
      $('html,body').scrollTop($(document).height());
      if (idx < msg.length) {
        setTimeout(gen, 8);
      }
    }
    gen();
  }
  return el;
}

var socket = io.connect(window.location.origin);
socket.on('connect', function() {
  $('#messages').append(displayMsg('Type \'join ROOM\' to enter a game.'));
  socket.on('message', function(msg) {
    $('#messages').append(displayMsg(msg));
  });
  $('#userInput').focus(); 
  $('#userInput').keyup(function(event) {
    switch (event.keyCode) {
      case 13: // ENTER
        var input = $('#userInput').val();
        var tokens = input.split(/\b\s+/);
        if (tokens[0] === 'join') {
          socket.emit('join', tokens.slice(1).join(' '));
        } else if (tokens[0] === 'reset') {
          $('#messages').empty();
          $('#messages').append(displayMsg('Type \'join ROOM\' to enter a game.'));
        } else {
          socket.emit('input', input);
          $('#messages').append('<li class="user-text">'+input+'</li>');
        }
        $('#userInput').val('');
        break;
    }
  });
});
