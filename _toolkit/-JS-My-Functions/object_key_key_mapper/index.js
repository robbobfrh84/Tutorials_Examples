const toEncode = "testGame1"
const object = require("./test_input/"+toEncode+".js")
const Base = require("./base_number_encode_decode.js")
const fs = require('fs')


function main(){
  const encoded = build_key_map(object)
  console.log("\n\nencoded.keyMap :", encoded.keyMap)

  fs.writeFile("./test_output/"+toEncode+".json", JSON.stringify(encoded), (err) => {
    if (!err) console.log(toEncode+' file has been saved!')
  })

}


function build_key_map(obj) {

  const keyMap = {}
  // const keyCounter = {} // 👈 See below: part of Not fully implimented
  let keyCount = 0

  function getKey(obj) {
    const level = {}
    Object.keys(obj).map(key=>{
      if (!keyMap[key]) {
        keyMap[key] = Base.toString(keyCount, 90)
        // keyCounter[key] = { count: 0, code: keyMap[key], type: "name", } // 👈 See below: part of Not fully implimented
        keyCount++
      }
      // keyCounter[key].count++ // 👈 See below: part of Not fully implimented
      level[keyMap[key]] = mapVar(obj[key])
    })
    return level
  }

  function mapVar(v) {
    if (v === null) {
      return v
    } else if (typeof v === "object" && Array.isArray(v)) {
      return v.map(a=> mapVar(a))
    } else if (typeof v === "object") {
      return getKey(v)
    } else {
      return v
    }
  }

  const encodedObject = mapVar(obj)

  /* 👇 Not fully implimented, But you could use this to populate encoded and only add duplicate names. Also, could be used for shared values as well

  console.log("keyCounter :", keyCounter)

  const singles = {}
  const multiples = {}

  Object.keys(keyCounter).forEach(x=>{
    if (keyCounter[x].count <= 1) singles[x] = keyCounter[x]
    else multiples[x] = keyCounter[x]
  })

  console.log("multiples :", multiples)
  console.log("singles :", singles)

  */  

  return { keyMap, encodedObject }

}

main()
