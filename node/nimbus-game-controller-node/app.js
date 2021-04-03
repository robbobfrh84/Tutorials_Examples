var gamepad = require("gamepad") //https://github.com/creationix/node-gamepad
gamepad.init()

for (var i = 0, l = gamepad.numDevices(); i < l; i++) {
  console.log(i, gamepad.deviceAtIndex())
}

setInterval(gamepad.processEvents, 16)
setInterval(gamepad.detectDevices, 500)

gamepad.on("move", function (id, axis, value) {

  switch (axis) {
    case 8: btnPress('A', id, axis, value); break;
    case 9: btnPress('B', id, axis, value); break;
    case 10: btnPress('X', id, axis, value); break;
    case 11: btnPress('Y', id, axis, value); break;

    case 4: btnPress('UP', id, axis, value); break;
    case 5: btnPress('RIGHT', id, axis, value); break;
    case 6: btnPress('DOWN', id, axis, value); break;
    case 7: btnPress('LEFT', id, axis, value); break;

    case 12: btnPress('L1', id, axis, value); break;
    case 13: btnPress('R1', id, axis, value); break;
    case 14: btnPress('L2', id, axis, value); break;
    case 15: btnPress('R2', id, axis, value); break;

    case 0: btnPress('L-PAD0', id, axis, value); break;
    case 1: btnPress('L-PAD1', id, axis, value); break;

    case 2: btnPress('R-PAD2', id, axis, value); break;
    case 3: btnPress('R-PAD3', id, axis, value); break;

    default: {
      console.log("move", { id: id, axis: axis, value: value, })
    }
  }

})

gamepad.on("up", function (id, num) {
  btnPress('START-UP', id)
})

gamepad.on("down", function (id, num) {
  btnPress('START-DOWN', id)
})

function btnPress(btn, id, axis, value){
  let val = ''
  if (axis < 4) {
    for (var i = 0; i < Math.abs(Math.floor(value*100)); i++) {
      val+=':'
    }
  }
  console.log(id+": "+btn+" :"+value+" "+val)
}
