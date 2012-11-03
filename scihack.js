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

function rulegen() {
  var rules = [];
  // food has color(3), size(3)
  for (i=0; i<11; i++) {
    var rule = {};
    rule.color = 'red';
    rule.num = Math.floor(Math.random()*3)+1);
    rules.push(rule);
  }
}
