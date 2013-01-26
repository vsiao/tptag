TPTag v0.1.1
============

Two-Player Text Adventure Game. Yeeeah.

`npm install tptag` to use.

```javascript

var TPTag = require('tptag');

var app = TPTag();

app.players(['Bro', 'Scotty']);
app.initState({hello: 'world'});

app.begin('Bro', 'Yo, Bro.');
app.begin('Scotty', 'HEY SCOTTY!!');

app.action('Bro', ['go', 'walk', 'head'], function(req, state) {
  if (req.tokens[1] === 'north') {
    req.game.announce('BRO IS GOING NORTH!!!');
  } else {
    req.player.notify('You can\'t go that way.');
  }
});

app.action('Scotty', 'smell', function(req, state) {
  req.player.notify('You\'re a dog. You love smelling things. MMMM.');
});

app.listen(8080);
```
