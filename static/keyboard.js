$(document).keydown(function(e) {
  // Check if the pressed key is the right arrow key (keyCode 39)
  if (e.keyCode === 39) {
    // Run your function here
    $("#next").click()
    // Add your custom function or code here
  }
});

$(document).keydown(function(e) {
  // Check if the pressed key is the right arrow key (keyCode 39)
  if (e.keyCode === 37) {
    // Run your function here
    $("#prev").click()
    // Add your custom function or code here
  }
});