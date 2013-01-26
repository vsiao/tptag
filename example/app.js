var TPTag = require('../');
var app = TPTag();

app.initState({
  name: ['Bob Sanders', 'Dog'],
  location: ['officenorth', 'officesouth'],
  state: ['awake', 'asleep']
});
app.action(['go', 'move', 'walk', 'head'], function(req, game) {
  switch (req.tokens[1]) {
    case 'north':
      switch (game.locations[req.player.id]) {
        case 'officesouth':
          return;
        case 'officemid':
          return;
      }
      break;
    case 'south':
      switch (game.locations[req.player.id]) {
        case 'officenorth':
          return;
        case 'officemid':
          return;
      }
      break;
  }
  req.player.notify('You can\'t go that way!');
});
app.action(['look', 'inspect', 'check'], function(req, game) {
});
app.action('say', function(req, game) {
  var msg = '"' + req.tokens.slice(1).join(' ') + '"';
  if (req.player.id === 0) {
    req.game.player1.notify('You say ' + msg);
    req.game.player2.notify(game.name[0] + ' says ' + msg);
  } else {
    req.game.player1.notify('Dog barks "BARK BARK, BARK"');
    req.game.player2.notify('You bark ' + msg);
  }
});
app.action('call', function(req, game) {
});

var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log("Listening on port %d in %s mode", port, app.settings.env);
});
