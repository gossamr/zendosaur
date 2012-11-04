//returns an array of objects of the guesses the player has made so far
/*
  returns [
            {
              "meal" : $the_meal
              "is_happy" : $true/false
            }
            {
              "meal" : $the_meal
              "is_happy" : $true/false
            }
        ]        
*/

var apple = {
    type: "macintosh",
    color: "red",
    getInfo: function () {
        return this.color + ' ' + this.type + ' apple';
    }
}
var store = {  
  
  startNewGame: function(rule) {
    localStorage["zen_rule"] = rule;
    localStorage["guesses"] = "";
  },
  
  getGuesses: function() {
    if (localStorage["guesses"] != "") {      
      return JSON.parse(localStorage["guesses"]);
    } else {
      return []
    }
  },

  /*
   takes the guess, and the boolean value for correctness of the guess meal
  */
  addGuess: function(g, is_happy) {
    if (localStorage["guesses"] != "") {    
      var current_guesses = JSON.parse(localStorage["guesses"]);
    } else {
      current_guesses = []
    } 
    var guess = {
      "meal" : g,
      "is_happy" : is_happy
    }  
    current_guesses.push(guess);
    localStorage["guesses"] = JSON.stringify(current_guesses);
  
  }

}