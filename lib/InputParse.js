function InputParse(player, input) {
  this.player = player;
  this.input = input;
  this.preps = [];
  this.objs = [];
  input = (input && input.trim()) || "";
  this.tokens = input.split(/\b\s+/);
  if (this.tokens.length) {
    this.action = this.tokens[0];
  }
}

module.exports = InputParse;
