const toEncode = "testGame1"

const fs = require('fs')
const jsonpack = require('jsonpack')
const object = require("./test_input/"+toEncode+".json")

var compressedJSON = jsonpack.pack( object )

fs.writeFile("./test_output/"+toEncode+".json",
JSON.stringify(compressedJSON),
(err) => {
  if (!err) console.log(toEncode+' file has been saved!')
  else console.log(err)
})

/*
⭐️ RESOURCES:
- https://www.npmjs.com/package/jsonpack
*/
