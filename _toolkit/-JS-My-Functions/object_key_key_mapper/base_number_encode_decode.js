const Base = {

  _Rixits: "0123456789!#%&()*+,-./:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[]^_`abcdefghijklmnopqrstuvwxyz{|}~",

  toString : function(number, base) {
    this._Rixits = this.getBaseChars(base)
    if (isNaN(Number(number)) || number === null ||
      number === Number.POSITIVE_INFINITY)
    throw "invalid number"
    if (number < 0)
    throw "no negatives"

    var rixit
    var residual = Math.floor(number)
    var result = ''
    while (true) {
      rixit = residual % this._Rixits.length
      result = this._Rixits.charAt(rixit) + result
      residual = Math.floor(residual / this._Rixits.length)
      if (residual == 0)
      break
    }
    return result
  },

  toNumber : function(rixits, base) {
    this._Rixits = this.getBaseChars(base)
    var result = 0
    rixits = rixits.split('')
    for (var e = 0; e < rixits.length; e++) {
      result = (result * this._Rixits.length) + this._Rixits.indexOf(rixits[e])
    }
    return result;
  },

  getBaseChars : function(base) {
    if (base > this._Rixits.length) {
      throw "Max Chars must be less than or equal to "+(this._Rixits.length)
    } else {
      return this._Rixits.slice(0,base)
    }
  }

}

module.exports = Base

// EXAMPLES!

// const num = 7777778987
// const encode = Base.toString(num, 91)
// const decode = Base.toNumber(encode, 91)
//
// console.log("num, encode, decode :", num, encode, decode)


// 👇 get asciis (I manually removed a few that posed a danger)

// let x = ""
// for (var i = 33; i < 127; i++) {
//   console.log(":"+String.fromCharCode(i)+":"+i);
//   x+=String.fromCharCode(i)
// }
// console.log(x)
// console.log(x.length)
