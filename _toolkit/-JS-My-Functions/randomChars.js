function _randId(length){
  dec2hex = (dec)=>{
    return ('0' + dec.toString(16)).substr(-2)
  }
  generateId = (len)=>{
    var arr = new Uint8Array((len || 40) / 2)
    window.crypto.getRandomValues(arr)
    return Array.from(arr, dec2hex).join('')
  }
  return generateId(length)
}

// Alternate (for server-side / node / GAS )
function Id_Generator(length) {
  var length = length || 15; s = '', r = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i=0; i < length; i++) { s += r.charAt(Math.floor(Math.random()*r.length)); }
  return s;
}
