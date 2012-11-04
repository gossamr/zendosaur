$(document).ready(function(){
  function reader() {
      var propSet = [];
      $(".container div").each(function() {
          classes = $(this).attr("class");
          propSet.push(classes)
      });
      return propSet;
  }

  $(".container").click(function(){
      $(".container").removeClass("selected");
      $(this).addClass("selected");
  });
});

function rnd(num) {
  return Math.floor(Math.random()*num)+1;
}

function rndrule() {
  type = rnd(3); 
  // food has color(3), size(3)
  switch(type) {
    case 1:
      rule.color = rnd(3);
      break;
    case 2:
      rule.size = rnd(3);
      break;
    case 3:
      rule.num = rnd(3);
      break;
  }
  return rule;
}

function rulegen() {
  var rules = [];
  for (i=0; i<11; i++) {
    var rule = rndrule();
    rules.push(rule);
  }
  return rules;
}

function mealgen(rule) {
  var meal = [];

  matches = 0;
  while (!matches) {
    size = rnd(4);
    meal = [];
    for (i=0;i<size;i++) {
      var food = {};
      food.size = rnd(3);
      food.color = rnd(3);
      meal.push(food);
    }
    matches = mealeval(meal, rule);
  }

  return meal;
}

function mealeval(meal, rule) {

  return true;
}

Array.prototype.shuffle = function () {
    for (var i = this.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = this[i];
        this[i] = this[j];
        this[j] = tmp;
    }

    return this;
}
