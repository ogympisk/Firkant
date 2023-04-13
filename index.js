var box = document.getElementById("box");
var x = window.innerWidth / 2 - box.offsetWidth / 2;
var y = window.innerHeight / 2 - box.offsetHeight / 2;
var boxWidth = box.offsetWidth;
var boxHeight = box.offsetHeight;
var screenWidth = window.innerWidth;
var screenHeight = window.innerHeight;

document.onkeydown = function(e) {
  var moveLeft = x > 0;
  var moveUp = y > 0;
  var moveRight = x + boxWidth < screenWidth;
  var moveDown = y + boxHeight < screenHeight;

  switch (e.keyCode) {
    case 37: // left arrow key
      if (moveLeft) {
        x -= 10;
      }
      break;
    case 38: // up arrow key
      if (moveUp) {
        y -= 10;
      }
      break;
    case 39: // right arrow key
      if (moveRight) {
        x += 10;
      }
      break;
    case 40: // down arrow key
      if (moveDown) {
        y += 10;
      }
      break;
  }

  // Check left boundary
  if (x < 0) {
    x = 0;
  }
  // Check top boundary
  if (y < 0) {
    y = 0;
  }
  // Check right boundary
  if (x + boxWidth > screenWidth) {
    x = screenWidth - boxWidth;
  }
  // Check bottom boundary
  if (y + boxHeight > screenHeight) {
    y = screenHeight - boxHeight;
  }

  box.style.transform = "translate(" + x + "px, " + y + "px)";
};

window.onload = function() {
  x = window.innerWidth / 2 - box.offsetWidth / 2;
  y = window.innerHeight / 2 - box.offsetHeight / 2;
  box.style.transform = "translate(" + x + "px, " + y + "px)";
  boxWidth = box.offsetWidth;
  boxHeight = box.offsetHeight;
  screenWidth = window.innerWidth;
  screenHeight = window.innerHeight;
}