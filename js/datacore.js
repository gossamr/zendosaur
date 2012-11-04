
$(document).ready( function() {
  
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
    el: $('.page'),
    events: {
      'click #feed': 'addGuess'
    },
    initialize: function(){
      _.bindAll(this, 'render', 'addGuess', 'appendGuess'); // remember: every function that uses 'this' as the current object should be in here

      this.collection = new Guesses();
      this.collection.bind('add', this.appendGuess); 

      this.render();      
    
    },
  
    render: function() {
      var self = this;
      
    },
    addGuess: function() {
      console.log("guess is registered")
      //on clicking the guess button, take the info from the dom of where the guess is located, and then translate it into a meal.  take the meal and compare it with mealeval(meal, rule)
      
      //will need to extract these foods from the html configuration
      number_meal = [];
      var current_pal  = parsepalettemeal();
      
      var map_size = [0,'small','med','large'];
      var color = [0,'nut','plant','insect'];  
      //meal is an array with food objects that have size property and food-type property
      
      var foods_array = [];
      
      for(var i = 0; i < current_pal.length; i++) {
        var food = current_pal[i];
        
        foods_array.push(new Food({size : map_size[food.size], food : color[food.color]}));
        
      }
      console.log("the guess checking")
      console.log(Zen_Rule);
      var meal = new Meal({
        foods : foods_array,
        is_happy : mealeval(current_pal, Zen_Rule)
        
      })
      this.collection.add(meal); // add item to collection; view is updated via event 'add'
      clearPalette();
    },
  
    appendGuess: function(guess) {
    
      var html_str = "<li class='guess'><div class='rancherhead "+ (guess.get("is_happy") ? "happy" : "sad") + "'></div>";
    
      for (var i = 0; i < guess.get("foods").length; i++) {
        var g = guess.get("foods")[i];
        
        html_str += "<div class='foodtainer'><img src='assets/"+ g.get("size") +"_"+  g.get("food")+".png'>"+" </div>"
      }
      html_str +="</li>";
      console.log("the element")
      console.log($( this.el));
      $('.guesslist',this.el).append(html_str);
    }
  });
  
  
  var DinoView = Backbone.View.extend({
     el: $('#zen_rule'),
     events: {
     },
     initialize: function(zen_rule){
        _.bindAll(this, 'render'); 
       this.render(zen_rule)
     },

     render: function(zen_rule) {
       var self = this;
       
       //generate a zen master rule for this dinosaur
       var map_size = [0,'small','med','large'];
       var color = [0,'nut','plant','insect'];  
       //meal is an array with food objects that have size property and food-type property
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
       
       var html_str = "";
       
       for(var i = 0; i < meal.get("foods").length; i++) {
         html_str += "<div class='foodtainer'><img src='assets/"+ meal.get("foods")[i].get("size")+"_"+meal.get("foods")[i].get("food")+".png'></div>"
       }
       html_str += "";
       
       console.log(html_str);
       $(this.el).append(html_str);
     },

   });
  
  var guessView = new GuessView();
  var Zen_Rule = rndrule();

  var dinoView = new DinoView(Zen_Rule);
  
  
});
