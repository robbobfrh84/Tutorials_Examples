var _loader1 = true

// BUTTON CALL
function _loader(event){
  const state = event.path[0].innerHTML
  event.path[0].innerHTML = _loader1 ? 'Start' : 'STOP'
  document.getElementById('loader1').style.display = _loader1 ? 'none' : ''
  _loader1 = !_loader1
}

// ⚠️ OR: > > > HARD CALL 👇

// _loader = ()=>{
//   if (direct_state_change) {
//     if (direct_state_change === 'on') _loader1 = true
//     if (direct_state_change === 'off') _loader1 = false
//   } else {
//     _loader1 = !_loader1
//   }
//   document.getElementById('loader1').style.display = _loader1 ? 'none' : ''
// }

// examples...

// startStop() // Toggles state
// startStop('on') // Turns On
// startStop('off') // Turns Off
//
