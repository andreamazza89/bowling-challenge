'use strict';

function Frame(firstRoll) {
  const MAX_PINS_PER_ROLL = 10;
  const MAX_PINS_PER_FRAME = 10;
  const STRIKE = 10;
  const SPARE = 10;
  this._open = firstRoll < STRIKE;
  this._strike = firstRoll > STRIKE;
  this._score = firstRoll;

  this.roll = function(pins) {
    if (pins > MAX_PINS_PER_ROLL) {
      throw ('Cannot create new frame: too many pins');
    }
    if (this._open) {
console.log(pins);
      this._score += pins;
      this._open = false;
    } else {
      throw ('Cannot roll on this frame: frame already completed');
    }
  };

  this.isSpare = function() {
    return this._score === SPARE;
  };
};

Frame.prototype = {
  
  isOpen: function() {
    return this._open;
  },

  isStrike: function() {
    return this._strike;
  },
  
  addBonus: function(bonusPins) {
    this._score =+ bonusPins;
  }

};
