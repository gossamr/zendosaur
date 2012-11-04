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
  var rule = {};
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
  var match = 0;
  if (rule.num && meal.length == rule.num) { match = 1; };
  for (var i = 0; i < meal.length; i++) {  
    if (rule.size && meal[i].size == rule.size) {
      match = 1;
    }
    if (rule.color && meal[i].color == rule.color) {
      match = 1;
    }
  }
  return match;
}

function recipegen(rule) {
  var recipe;
  var size = [0,'small','medium','large'];
  var color = [0,'red','green','yellow'];  
  if (rule.num > 1) {
    recipe = "He wants to eat "+rule.num+" bites.";
  } else {
    recipe = "He wants to eat 1 bite.";
  }
  if (rule.size) {
    recipe = "He wants to eat a "+size[rule.size]+" portion.";
  }
  if (rule.color) {
    recipe = "He wants to eat a "+color[rule.color]+" bite.";
  }
  return recipe;
}
