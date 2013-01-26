var TPTag = require('../');
var app = TPTag();

app.action(['go', 'move', 'walk', 'head'], function(req, game) {
});
app.action(['look', 'inspect', 'check'], function(req, game) {
});
app.action('say', function(req, game) {
});
app.action('call', function(req, game) {
});

var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log("Listening on port %d in %s mode", port, app.settings.env);
});
