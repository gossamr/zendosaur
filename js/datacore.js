  
  //need increment and decrement for health bar
  //3 guesses, and then he is full, so then the recipe button is highlighted. he can guess or not
  
  /*  
  with javascript as you click things it changes the guess component div.  on "feed" it reads the data from the divs and then interprets it into the data store object
  */


(function($){
  
  var Food = Backbone.Model.extend({
    defaults: {
      size: '',
      food: ''
    },
  });
  //a meal is an array of foods. the zen master's initial presentation is also a meal
  var Meal = Backbone.Model.extend({
    foods : [],
    is_happy : false
  });

  var Guesses = Backbone.Collection.extend({
      model: Meal
    });
  
  // the view container for the guesses
  var GuessView = Backbone.View.extend({
    el: $('body'),
    events: {
      'click button#feed': 'addGuess'
    },
    initialize: function(){
      _.bindAll(this, 'render', 'addGuess', 'appendGuess'); // remember: every function that uses 'this' as the current object should be in here

      this.collection = new Guesses();
      this.collection.bind('add', this.appendGuess); // collection event binder

      this.render();      
    
    },
  
    render: function() {
      var self = this;
      $(this.el).append("<button id='feed'>Make guess/feed</button>");
      //$('',this.el).append("<ul class='guesslist'></ul>");
    },
    addGuess: function() {
      //will need to extract these foods from the html configuration
      var meal = new Meal({
        foods : [
          new Food({size : "small", food : "nut"}),
          new Food({size : "large", food : "nut"}),
          new Food({size : "small", food : "fern"})
          
        ],
        is_happy : Math.round(Math.random())
        
      })
      this.collection.add(meal); // add item to collection; view is updated via event 'add'
    },
  
    appendGuess: function(guess) {
    
      var html_str = "<li class='guess'><div class='rancherhead "+ (guess.get("is_happy") ? "happy" : "sad") + "'></div>";
    
      for (var i = 0; i < guess.get("foods").length; i++) {
        var g = guess.get("foods")[i];
        html_str += "<div class='foodtainer "+ g.get("size") + " "+ g.get("food")
         + " '>" + g.get("size") + " "+ g.get("food") +  "</div>"
      }
      html_str +="</li>";
      
      $('.page ul.guesslist', this.el).append(html_str);
    }
  });
  
  
  var guessView = new GuessView();
  
})(jQuery);
