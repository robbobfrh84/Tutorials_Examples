const toEncode = "about_to_win"

const fs = require('fs')
const jsonpack = require('jsonpack')
const object = require("./test_output/"+toEncode+".json")

var compressedJSON = jsonpack.unpack( object )

fs.writeFile("./test_output_decoded/"+toEncode+".json",
JSON.stringify(compressedJSON),
(err) => {
  if (!err) console.log(toEncode+' file has been decoded!')
  else console.log(err)
})

/*
⭐️ RESOURCES:
- https://www.npmjs.com/package/jsonpack
*/
