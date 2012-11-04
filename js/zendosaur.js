$(document).ready(function(){
  $(".container").click(function(){
      $(".container").removeClass("selected");
      $(this).addClass("selected");
  });
  
});

function rnd(num) {
  return Math.floor(Math.random()*num)+1;
}

function rndrule() {
  type = rnd(6); 
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
      rule.num = rnd(4);
      break;
    case 4:
      rule.num = rnd(4);
      rule.color = rnd(3);
      break;
    case 5:
      rule.num = rnd(4);
      rule.size = rnd(3);
      break;
    case 6:
      rule.color = rnd(3);
      rule.size = rnd(3);
      break;
    case 7:
      rule.num = rnd(4);
      rule.color = rnd(3);
      rule.size = rnd(3);
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

function numeval(meal, rule) {
  if (rule.num) {
    return (meal.length == rule.num); 
  }
  return true;
}

function sizeeval(food, rule) {
  if (rule.size) {
    return (food.size == rule.size);
  }
  return true;
}

function coloreval(food, rule) {
  if (rule.color) {
    return (food.color == rule.color);
  }
  return true;
}

function mealeval(meal, rule) {
  var match = false;
  for (i = 0; i < meal.length; i++) {
    match = match || (sizeeval(meal[i], rule) && coloreval(meal[i], rule));
  }
  return numeval(meal, rule) && match;
}

function recipegen(rule, dinoname) {
  var recipe;
  dinoname = 'Stego'; // FIXME
  var size = [0,'small','medium','large'];
  var color = [0,'nut','plant','insect'];  
  recipe = dinoname;
  if (rule.num && rule.size && rule.color) {
    if (rule.num > 1) {
      recipe += " wants to eat a "+size[rule.size]+" "+color[rule.color]+" portion among "+rule.num+" foods.";
    } else {
      recipe += " wants to eat only one food.";
    }
  } else if (rule.size && rule.color) {
    recipe += " wants to eat a "+size[rule.size]+" "+color[rule.color]+" portion.";
  } else if (rule.num && rule.color) {
    if (rule.num > 1) {
      recipe += " wants to eat a "+color[rule.color]+" portion among "+rule.num+" foods.";
    } else {
      recipe += " wants to eat only one "+color[rule.color]+" food.";
    }
  } else if (rule.num && rule.size) {
    if (rule.num > 1) {
      recipe += " wants to eat a "+size[rule.size]+" portion among "+rule.num+" foods.";
    } else {
      recipe += " wants to eat only one "+size[rule.size]+" food.";
    }
  } else if (rule.num) {
    if (rule.num > 1) {
      recipe += " wants to eat "+rule.num+" foods.";
    } else {
      recipe += " wants to eat only one food.";
    }
  } else if (rule.size) {
    recipe += " wants to eat a "+size[rule.size]+" portion.";
  } else if (rule.color) {
    recipe += " wants to eat a "+color[rule.color]+" portion.";
  }
  return recipe;
}

function parsepalettemeal() {
  var meal = [];
  $('.palette .foodtainer').each(function(){ 
    if ($(this).data("food")) {
      var arr = $(this).data("food").split(' ');
      meal.push({ size: arr[0], color: arr[1] } ); 
    }
  });
  return meal; 
}
