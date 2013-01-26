var TPTag = require('../');
var app = TPTag();

app.players(['Bob Sanders', 'Dog']);
app.initState({
  'Bob Sanders': {
    location: 'officenorth',
    inspectednote: false
  },
  'Dog': {
    location: 'officesouth',
    status: 'asleep',
    sleepcount: 1
  }
});

app.begin('Bob Sanders', 'You are Bob Sanders, time space explorer consultant. Yes, you do exactly that - you spend all day sitting in your tiny, uneventful cubicle advising to-be successful time travelers. After all, someone needs to prevent time-space paradoxes and other multidimensional nonsense. You are currently at your desk. <LINEBREAK> To your west and east are walls. Your office extends to the south. What would you like to do? ');
app.begin('Dog', 'You decide to examine the modernist paradigm of reality. It\'s unlikely that you\'ll reject the subdeconstructive... Zzz');

// Bob asking for help
app.action('Bob Sanders', ['help'],
function(){
  req.player.notify('Remember, you can always talk to your partner by typing \'say\'');
  return;               
});

// Bob Moving
app.action('Bob Sanders', ['go', 'move', 'walk', 'head'],
function(req, state) {
  switch (req.tokens[1]) {
    // If Bob tries to move north
    case 'north':
      switch (state[req.player.name].location) {
        case 'officesouth':
          req.player.notify('You\'re back beside your desk');
          state['Bob Sanders'].location = "officenorth";
          return;
        case 'officenorth':
          req.player.notify('You bump into your desk. Ow.');
          return;
      }
      break;
    // If Bob tries to move south
    case 'south':
      switch (state[req.player.name].location) {
        case 'officenorth':
          if (state['Dog'].status == "asleep"){
            req.player.notify('YIKES. you just stepped on your dog. whoops, you forgot you brought him to work today. don\'t forget, you can type "Say" to speak to your partner!');
            req.game.player2.notify('OW. Your friend just stepped on you. But now you\'re awake. The aroma of tuna fills your nose. What would you like to do?');
            state['Dog'].status = "awake";
          }
          req.player.notify('You\'re now at the south side of the cubicle.');
          state['Bob Sanders'].location = "officesouth";
          return;
        case 'officesouth':
          req.player.notify('Exit your office? Naw, you need to stay in your cubicle and work.');
          return;
      }
      break;
  }
  req.player.notify('You can\'t go that way!');
});

// Bob Inspecting Items
app.action('Bob Sanders', ['inspect','look','check','view','see','watch','observe','note'],
function(req, state){
  if (state[req.player.name].location == 'officesouth'){ req.player.notify('You are not at your desk!'); return;}
  switch (req.tokens[1]) {
    case 'desk':
      req.player.notify('Well. Looks like there is a Windows 34 Fusion-Tablet-Desktop Computer, and a cork bulletin board with some notes');
      return;
    case 'computer':
      req.player.notify('There\'s a message on the screen. It says.. Log your time sheets! Useless.');
      return;
    case 'bulletin':
      req.player.notify('Has some notes pinned to it');
      return;
    case 'notes':
      req.player.notify('It says.. STAY CALM & NEVER KILL HITLER');
      return;
    }
    req.player.notify('That\'s not something you can inspect!');
})



// Bob Talking
app.action('Bob Sanders', 'say', function(req, state) {
  if (req.tokens.length <= 1) {
    req.player.notify('What do you want to say?');
    return;
  }
  var msg = '"' + req.tokens.slice(1).join(' ') + '"';
  req.game.player1.notify('You say ' + msg);
  req.game.player2.notify('Your friend says ' + msg);
});

// Dog Talking
app.action('Dog', 'say', function(req, state) {
  if (req.tokens.length <= 1) {
    req.player.notify('What do you want to say?');
    return;
  }
  var msg = '"' + req.tokens.slice(1).join(' ') + '"';
  req.game.player1.notify('Dog says "BARK BARK, BARK"');
  req.game.player2.notify('You say ' + msg);
});

// Dog asks for help
app.action('Dog', ['help','ask'], function(req,state) {
  req.player.notify('Well, if you need help, you can always type \'say\' to talk to your partner');
  return;
});
// Dog is asleep
app.action('Dog', ['go', 'move', 'walk', 'head', 'look','yell','cry','fetch','find'],
function(req, state) {
  if (state['Dog'].status == "asleep"){
    switch (state['Dog'].sleepcount){
      case 1:
        req.game.player2.notify('You remain in the same spot... What\'s going on?... Zzz');
        state['Dog'].sleepcount ++;
        return;
      case 2:
        req.game.player2.notify('I put on my robe and wizard hat... Zzz...');
        state['Dog'].sleepcount ++;
        return;
      case 3:
        req.game.player2.notify('Zzz... cats... calculus... cream puffs... Zzz...');
        state['Dog'].sleepcount ++;
        return
      case 4:
        req.game.player2.notify('You remain in the same spot.... Zzz... Remember, you can type \'say\' to talk to your friend');
        state['Dog'].sleepcount = 1;
        return
    }
  }
});

var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log("Listening on port %d in %s mode", port, app.settings.env);
});
