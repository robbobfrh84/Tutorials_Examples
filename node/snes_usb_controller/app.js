var gamepad = require("gamepad") //https://github.com/creationix/node-gamepad
gamepad.init()

for (var i = 0, l = gamepad.numDevices(); i < l; i++) {
  console.log(i, gamepad.deviceAtIndex())
}

setInterval(gamepad.processEvents, 16)
setInterval(gamepad.detectDevices, 500)

gamepad.on("up", function (id, num) {
  getButton("up",num)
})

gamepad.on("down", function (id, num) {
  getButton("down",num)
})

gamepad.on("move", function (id, axis, value) { // directional Buttons
  getButton('?',axis+":"+Math.round(value))
})

function getButton(dir,num) {
  let button = "unknown button"
  switch (num) {
    case 9: button = "Start"; break;
    case 8: button = "Select"; break;
    case 1: button = "A"; break;
    case 2: button = "B"; break;
    case 0: button = "X"; break;
    case 3: button = "Y"; break;
    case 4: button = "L"; break;
    case 5: button = "R"; break;

    // MAC Directionals
    case "3:-1": button = "DL"; dir = "down"; break;
    case "3:1": button = "DR"; dir = "down"; break;
    case "3:0": button = "DLR"; dir = "up"; break;
    case "4:-1": button = "DU"; dir = "down"; break;
    case "4:1": button = "DD"; dir = "down"; break;
    case "4:0": button = "DUD"; dir = "up"; break;

    // // Raspberry Pi Directionals
    // case "0:-1": button = "DL"; dir = "down"; break;
    // case "0:1": button = "DR"; dir = "down"; break;
    // case "0:0": button = "DLR"; dir = "up"; break;
    // case "1:-1": button = "DU"; dir = "down"; break;
    // case "1:1": button = "DD"; dir = "down"; break;
    // case "1:0": button = "DUD"; dir = "up"; break;
  }
  console.log(button+":"+dir+':'+num+".")
}
