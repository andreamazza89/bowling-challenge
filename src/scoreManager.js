//Understands how to keep track of the score in a game of 10-pin bowling

'use strict';

function ScoreManager(frameModel = Frame()) {
  this._frameModel = frameModel;
  this._frames = [];
  this._gameFinished = false;

};

ScoreManager.prototype = {

  checkBonusPoints: function(pins) {
    if (this._frames[this._frames.length-1].isSpare()) {
      this._frames[this._frames.length-1].addBonus(pins);
    } else if (this._frames.length > 1 && this._frames[this._frames.length-2].isStrike() &&
               this._frames[this._frames.length-3].isStrike()) {
      this._frames[this._frames.length-3].addBonus(pins + this._frames[this._frames.length-2].getScore());
    } else if (!(this._frames[this._frames.length-1].isOpen()) &&  this._frames[this._frames.length-1].isStrike()) {
      this._frames[this._frames.length-2].addBonus(this._frames[this._frames.length-1].getScore());
    }
  },

  roll: function(pins) {
    if (this._frames.length > 0 && this._frames[this._frames.length-1].isOpen()) {
      this._frames[this._frames.length-1].roll(pins);
    } else {
      this._frames.push(new Frame(pins));
    }
    if (this._frames.length > 0){
      this.checkBonusPoints(pins);
    }
  },
  
  currentFrame: function() {
    return this._frames.length;
  },

  getScore: function() {
    var latestScore = 0;
    this._frames.forEach(function(frame) { latestScore += frame._score; });
    return latestScore;
  },
    
  isGameFinished: function() {
    return this._gameFinished;
  },

};
