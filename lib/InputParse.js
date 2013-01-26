var PREPOSITIONS = [
  "above", "across", "around", "at",
  "before", "behind", "below", "beneath", "between",
  "down",
  "in", "inside", "into",
  "off", "on", "out", "outside",
  "through",
  "under", "up",
  "with"
];

var ARTICLES = [
   "a", "an", "that", "the"
];

function arrStrExist(arr, str) {
  var i;
  for (i = 0; i < arr.length; ++i) {
    if (arr[i] === str) {
      return true;
    }
  }
  return false;
}

function InputParse(player, input) {
  this.player = player;
  this.input = input;
  this.preps = [];
  this.objs = [];
  input = (input && input.trim()) || "";
  var tokens = input.split(/\b\s+/);
  var i;
  for (i = 0; i < tokens.length; ++i) {
    if (i == 0) {
      this.action = tokens[0];
    } else {
      if (arrStrExists(PREPOSITIONS, tokens[i])) {
        this.preps.push(tokens[i]);
      } else if (arrStrExists(ARTICLES, tokens[i])) {
        // ignore dat
      } else {
        this.objs.push(tokens[i]);
      }
    }
  }
}

module.exports = InputParse;
