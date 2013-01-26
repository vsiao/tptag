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

$(document).ready(function(){
  $('#userInput').focus(); 
});

var socket = io.connect(window.location.origin);
socket.on('connect', function() {
  socket.on('message', function(msg) {
    $('#messages').append(displayMsg(msg));
  });
  $('#userInput').keyup(function(event) {
    switch (event.keyCode) {
      case 13: // ENTER
        socket.emit('input', $('#userInput').val());
<<<<<<< HEAD
        $('#messages').append('<li class="user-text">'+$('#userInput').val()+'</li>');
        $('#userInput').val("");
=======
        $('#userInput').val('');
>>>>>>> periods and auto-scroll
        break;
    }
  });
});
