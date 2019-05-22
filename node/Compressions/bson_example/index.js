const toEncode = "testGame1"
const object = require("./test_input/"+toEncode+".js")
const fs = require('fs')

const BSON = require('bson');
const Long = BSON.Long;

// Serialize a document
const data = BSON.serialize(object);
console.log('data:', data);

fs.writeFile("./test_output/"+toEncode, data, (err) => {
  if (!err) console.log(toEncode+' file has been saved!')
  else console.log(err)
})

// Deserialize the resulting Buffer
// const doc_2 = BSON.deserialize(data);
// console.log('doc_2:', doc_2);
