function clearPalette() {
  $("#keypad .palette .foodtainer").html('<img src="assets/empty.jpg"/>');
  $("#keypad .palette .foodtainer").removeData('food');
  $("#keypad .palette .foodtainer").removeClass("selected");
}
$(document).ready(function(){
  $("#keypad .palette .foodtainer").click(function(){
      $("#keypad .palette .foodtainer").removeClass("selected");
      $(this).addClass("selected");
  });
  $("#keypad .grid .foodtainer").click(function(){
    var selected = $("#keypad .palette .foodtainer.selected");
    var thisfood = $(this).attr("data-food");
    var thisimage = $(this).html();
    selected.data('food', thisfood);
    selected.html(thisimage);
  })

});
