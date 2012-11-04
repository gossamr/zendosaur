
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
      this.collection.bind('add', this.appendGuess); 

      this.render();      
    
    },
  
    render: function() {
      var self = this;
      $(this.el).append("<button id='feed'>Make guess/feed</button>");
      $('.page', this.el).append("<button>uheot</button>")
      
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
      console.log("the element")
      console.log($( this.el));
      $(".dinospot", this.el).append(html_str);
    }
  });
  
  
  var DinoView = Backbone.View.extend({
     el: $('#zen_rule'),
     events: {
     },
     initialize: function(){
        _.bindAll(this, 'render'); 
       this.render()
     },

     render: function() {
       var self = this;
       
       //generate a zen master rule for this dinosaur
       var map_size = [0,'small','medium','large'];
       var color = [0,'red','green','yellow'];  

       var zen_rule = rndrule();
       //meal is an array with food objects that have size property and color property
       var zen_meal = mealgen(zen_rule)
       var foods_array = [];
       console.log(zen_meal)
       for(var i = 0; i < zen_meal.length; i++) {
         var food = zen_meal[i];
         
         foods_array.push(new Food({size : map_size[food.size], food : color[food.color]}));
         
       }
       console.log(foods_array)
       var meal = new Meal({
         foods : foods_array,
         is_happy : true
       });
       
       var html_str = "<div><ul><li>";
       
       for(var i = 0; i < meal.get("foods").length; i++) {
         html_str += "<div class='foodtainer " + meal.get("foods")[i].get("food") + " "+ meal.get("foods")[i].get("size") +"'></div>"
       }
       html_str += "</li></ul></div>";
       
       console.log(html_str);
       console.log($(this.el));
       $(this.el).append(html_str);
       
       console.log($(this.el).html());
     },

   });
  
  
  
  var guessView = new GuessView();
  var dinoView = new DinoView();
  
  
  
})(jQuery);
