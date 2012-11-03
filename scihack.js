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
