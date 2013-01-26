var TPTag = require('../');
var app = TPTag();

app.players(['Bob Sanders', 'Dog']);
app.initState({
  'Bob Sanders': {
    location: 'officenorth',
  },
  'Dog': {
    location: 'officesouth',
    status: 'asleep'
  }
});
app.begin('Bob Sanders', 'Hello Colonel Sanders. <3 KFC');
app.begin('Dog', 'You hate cats. Meow.');
app.action('Bob Sanders', ['go', 'move', 'walk', 'head'],
function(req, state) {
  switch (req.tokens[1]) {
    case 'north':
      switch (state[req.player.name].location) {
        case 'officesouth':
          return;
        case 'officemid':
          return;
      }
      break;
    case 'south':
      switch (state.locations[req.player.id]) {
        case 'officenorth':
          return;
        case 'officemid':
          return;
      }
      break;
  }
  req.player.notify('You can\'t go that way!');
});
app.action('Bob Sanders', 'say', function(req, state) {
  if (req.tokens.length <= 1) {
    req.player.notify('What do you want to say?');
    return;
  }
  var msg = '"' + req.tokens.slice(1).join(' ') + '"';
  req.game.player1.notify('You say ' + msg);
  req.game.player2.notify('Bob Sanders says ' + msg);
});
app.action('Dog', 'say', function(req, state) {
  if (req.tokens.length <= 1) {
    req.player.notify('What do you want to say?');
    return;
  }
  var msg = '"' + req.tokens.slice(1).join(' ') + '"';
  req.game.player1.notify('Dog barks "BARK BARK, BARK"');
  req.game.player2.notify('You bark ' + msg);
});

var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log("Listening on port %d in %s mode", port, app.settings.env);
});
