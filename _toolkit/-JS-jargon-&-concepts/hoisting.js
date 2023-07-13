var x = 1

function house1(){
  console.log('1) ', x)
  x = 2
  console.log('2) ', x)
}

house1()

var x = 1

function house2(){
  console.log('1) ', x)
  var x = 2
  console.log('2) ', x)
}

house2()

var x = 1

function house3(){
  console.log('1) ', x) // 🚨 This draws an error, x is NOT hoised becuase it's a let declarative.
  let x = 2
  console.log('2) ', x)
}

house3()


// const myConst = 3
// myConst = 5
