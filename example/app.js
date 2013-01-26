var TPTag = require('../');
var app = TPTag();

app.players(['Bob Sanders', 'Dog']);
app.initState({
  'Bob Sanders': {
    location: 'officenorth',
    inspectednote: false,
    emergency: false,
    hastuna: false
  },
  'Dog': {
    location: 'officesouth',
    status: 'asleep',
    sleepcount: 1,
    tunaidentified: false,
    knockedtrashover: false
  }
});

app.begin('Bob Sanders', 'Welcome to the adventures of Bob Sanders! \n You are Player 1, Bob Sanders, time space explorer consultant. Yes, you do exactly that - you spend all day sitting in your tiny, uneventful cubicle advising to-be successful time travelers. After all, someone needs to prevent time-space paradoxes and other multidimensional nonsense. \n You are currently at your desk. To your west and east are walls. Your office extends to the south. What would you like to do? ');
app.begin('Dog', 'Welcome to the adventures of Bob Sanders! You are Player 2. \n You decide to examine the modernist paradigm of reality. It\'s unlikely that you\'ll reject the subdeconstructive... Zzz');

// Bob asking for help
app.action('Bob Sanders', ['help'], function(req, state) {
  req.player.notify('Remember, you can always talk ' +
    'to your partner by typing \'say message\'.');
});

// Bob Moving
app.action('Bob Sanders', ['go', 'move', 'walk', 'head'],
function(req, state) {
  switch (req.tokens[1]) {
    
    // If Bob tries to move north
    case 'north':
      switch (state[req.player.name].location) {
        case 'officesouth':
          req.player.notify('You\'re back beside your desk.');
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
            req.player.notify('YIKES. you just stepped on your dog.'
              + ' whoops, you forgot you brought him to work today.'
              + ' don\'t forget, you can type "Say" to speak to your partner!'
              + ' \n you are now at the south side of your cubicle');
            req.game.player2.notify('OW. Your friend just stepped on you.'
              + ' But now you\'re awake. The aroma of tuna fills your nose.'
              + ' There is some stuff to the north, too. What would you like to do?');
            state['Bob Sanders'].location = "officesouth";
            state['Dog'].status = "awake";
            return;
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

app.action('Bob Sanders', ['forward','back','left','right'], function(req, state) {
  req.player.notify('Hm. I don\'t really understand that. How about something like go north?');
  return;
});

// Bob Taking Items
app.action('Bob Sanders', ['reach','get','take','grab'], function(req, state) {
  
  // If the tuna has been identified
  if (state['Dog'].tunaidentified == true){
    if (req.tokens[1] == "tuna"){
      req.player.notify('OK! You now have Tuna');
      state['Bob Sanders'].hastuna = true;
      return;
    } else {
      req.player.notify('You have better things to worry about right now... like the GIANT WORMHOLE.');
      return;
    }
  }
  
  // Rest of the time
  switch(req.tokens[1]){
    case 'both':
      if (state['Bob Sanders'].emergency == false){ req.player.notify('This is no emergency. You don\'t need that time gel.. or the tuna for that matter.'); return; }
      req.player.notify('You clumsy idiot! You dropped both cans on the floor. You know your lunch is ruined, but the time traveling gel is ok. You still can\'t tell which one is which...');
      req.game.player2.notify('Two cans of objects come crashing down. Hmm... this smells like tuna... not sure what the other one is...');
      state['Dog'].tunaidentified = true;
      return;
    case 'cans':
      if (state['Bob Sanders'].emergency == false){ req.player.notify('This is no emergency. You don\'t need that time gel.. or the tuna for that matter.'); return; }
      req.player.notify('You clumsy idiot! You dropped both cans on the floor. You know your lunch is useless now, but the time traveling gel is ok. You still can\'t tell which one is which...');
      req.game.player2.notify('Two cans of objects come crashing down. Hmm... this smells like tuna... not sure what the other one is...');
      return;
    case 'tuna':
      req.player.notify('You can\'t tell which can is which. Perhaps you should just grab both cans.');
      return;
    case 'gel':
      req.player.notify('You can\'t tell which can is which. Perhaps you should just grab both cans.');
      return;
    case 'can':
      req.player.notify('You can\'t tell which can is which. Perhaps you should just grab both cans.');
      return;
  }
});

// Bob Inspecting Items
app.action('Bob Sanders', ['examine','inspect','look','check','view','see','watch','observe','note'], function(req, state){
  switch(req.tokens[1]){
    case 'around':
      req.player.notify('There\'s a desk to the north, with some stuff on it. There\'s a shelf above you, also with some stuff on it. Looks like a pretty lame office.');
      return;
    case 'up':
      req.player.notify('There\'s a shelf.');
      return;
    case 'shelf':
      req.player.notify('It\'s your lunch, beside a canister of portable time portal propellent gel. You forgot to label them, so they both look like pink cans of goo.');
      return;
    case 'can':
      req.player.notify('Can... pretty useless to just stare at it. Plus I can\'t tell what it is.');
      return;
  }
  
  if (state[req.player.name].location == 'officesouth'){
    req.player.notify('You are not at your desk!'); return;
  }
  
  switch (req.tokens[1]) {
    case 'desk':
      req.player.notify('Well. Looks like there is a Windows 34 Fusion-Tablet-Desktop Computer, and a cork bulletin board with some notes.');
      return;
    case 'computer':
      if (state['Bob Sanders'].emergency == true){
        req.player.notify('It\'s a message from the future you! Typical. You read the message: "HEY YOU, this is YOUR fault. You MESSED UP. You had one job. YOU HAD ONE JOB. GO BACK IN TIME and FIX IT."');
        return;
      }
      req.player.notify('There\'s a message on the screen. It says.. Log your time sheets! Useless.');
      return;
    case 'bulletin':
      req.player.notify('Has some notes pinned to it.');
      return;
    case 'trash':
      req.player.notify('Just trash. nothing exciting.');
      return;
    case 'garbage':
      req.player.notify('Just garbage. smelly.');
      return;
    case 'board':
      req.player.notify('The bulletin board has some notes pinned to it.');
      return;
    case 'notes':
      req.player.notify('It says.. STAY CALM & NEVER KILL HITLER.');
      return;
    case 'document':
      req.player.notify('Huh. How did this get here... "Inspection for the third"... suddenly... you hear a loud shriek. A low, thunderous rumble echos throughout the office. The left wall rips off and flys into a giant wormhole. You\'re heavy enough to not be sucked away- a flashing message appears on the computer.');
      req.game.player2.notify('What the hell did you just do. You knocked over a trash can, and you BROKE THE WORLD. The Wall to your right DISAPPEARS INTO SOME SORT OF GIANT VACUUM CLEANER. QUICK, PANIC. RUN AROUND. FREAK OUT. GODDAMIT, You\'re going to get sent to the kennel again.');
      state['Bob Sanders'].emergency = true;
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
  var msg = '"' + req.tokens.slice(1).join(' ') + '".';
  req.game.player1.notify('You say ' + msg);
  req.game.player2.notify('Your friend says ' + msg);
});

// Dog Eating
app.action('Dog',['taste','eat','lick','sniff','identify','find'], function(req, state){
  if (state['Dog'].tunaidentified){
    if (req.tokens[1] == "tuna"){
      req.game.player1.notify('Your dog seems to be licking one of the substances... wait a minute, that one he\'s not licking is the time patch! You pick up the time gel, and you apply it to the wormhole. You\'ve saved the world! Yay. The End.');
      req.game.player2.notify('Mmm.. Tuna.');
      return;
    }
  }
  
  req.player.notify('You\'re a dog, you don\'t know what\'s what.');
  return;

});

// Dog Actions
app.action('Dog',['poop','poo','pee'], function(req, state) {
  req.player.notify('Hm. Not now.');
  return;
  
})

// Dog Talking
app.action('Dog', 'say', function(req, state) {
  if (req.tokens.length <= 1) {
    req.player.notify('What do you want to say?');
    return;
  }
  var msg = '"' + req.tokens.slice(1).join(' ') + '"';
  req.game.player1.notify('Dog says "WOOF WOOF, WOOF".');
  req.game.player2.notify('You say ' + msg);
});

// Dog asks for help
app.action('Dog', ['help','ask'], function(req,state) {
  req.player.notify('Well, if you need help, you can always type \'say\' to talk to your partner.');
  return;
});

// Dog inspects
app.action('Dog',['examine','inspect','look','check','knock','hit','view','see','watch','observe','note','read','grab','take','get','use'], function(req,state) {
  
  if (state['Dog'].status == "asleep") { sleeptalk(req,state); return; }
  
  // look around
  if (req.tokens[1] == "around"){
    req.player.notify('You look around. Theres not much in this miserable little cubicle... The smell of tuna is still pretty strong, though.');
    return;
  }
  // if trash can is knocked over
  if (state['Dog'].tunaidentified == true){
    if (req.tokens[1] == "tuna"){
      req.player.notify('SO. TEMPTING. you LOVE tuna.');
      return;
    } else {
      req.player.notify('That no longer excites you.');
      return;
    }
  }
  
  // if emergency, and dog checks out the tuna
  if (state['Dog'].emergency == true){
    if (req.tokens[1] == "tuna"){
      req.player.notify('WANT TUNA SO BADLY.');
      return;
    }
  }
  
  if (req.tokens[1] == "trash" || req.tokens[1] == "garbage") {
    req.player.notify('You go up to the trash can. You knock it over. Oops. Trash is everywhere. There\'s a banana peel, and a document. Now what?');
    req.game.player1.notify('Oops. Your dog just knocked over the trash can under the desk. dumb dog. You see a document fall out of it...');
    state['Dog'].knockedtrashover = true;
    return;
  } else if (req.tokens[1] == "tuna") {
    req.player.notify('Hm. Can\'t inspect it. Don\'t know where it\'s coming from... seems to be above you though');
    return;
  } else if (req.tokens[1] == "document") {
    req.player.notify('You can\'t read! You are a dog.');
    return;
  } else if (req.tokens[1] == "banana" || req.tokens[1] == "peel"){
    req.player.notify('Dang, thats one exciting banana peel');
    return;
  } else if (req.tokens[1] == "up"){
    req.player.notify('You are too short. You can not see what is up.');
    return;
  } else {
    req.player.notify('I don\'t know what that is...');
    return;
  }
  req.player.notify('Not sure what you mean...');
  return;
  
});

// Dog moves
app.action('Dog', ['go', 'move', 'walk', 'head'], function(req, state) {
  if (state['Dog'].status == "asleep"){ sleeptalk(req,state); return; }
  switch (state[req.player.name].location){
    case 'officesouth':
      if (req.tokens[1] == 'north' || req.tokens[1] == 'forward' || req.tokens[1] == 'ahead'){
        if (state['Dog'].knockedtrashover == true){
          req.player.notify('You are now on the north side of the office. There\'s your knocked over trash can. Nice one.');
          state[req.player.name].location='officenorth';
          return;
        }
        req.player.notify('You are now on the north side of the office. There\'s not much you can see. This trash can sure looks interesting, though.');
        state[req.player.name].location='officenorth';
        return;
      }
    break;
    case 'officenorth':
      if (req.tokens[1] == 'south' || req.tokens[1] == 'backwards' || req.tokens[1] == 'back'){
        req.player.notify('You are now on the south side of the office. Nothing exciting here. To your north is a desk.');
        state[req.player.name].location='officesouth';
        return;
      }
    break;
  }
  req.player.notify('Err. I can\'t do that.');

});

// Dog is asleep
app.action('Dog', ['yell','cry','fetch','find'], function(req, state) {
  if (state['Dog'].status == "asleep") {
    sleeptalk(req,state);
  }
});

function sleeptalk(req,state) {
  switch (state['Dog'].sleepcount) {
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
      req.game.player2.notify('You remain in the same spot.... Zzz... Remember, you can type \'say MESSAGE\' to talk to your friend.');
      state['Dog'].sleepcount = 1;
      return
  }
}

var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log("Listening on port %d in %s mode", port, app.settings.env);
});
