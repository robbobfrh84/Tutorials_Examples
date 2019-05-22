const zlib = require('zlib');
const fs = require('fs');

const toUnZip = "about_to_win"

let stringData = ''
fs.createReadStream('./test_output/'+toUnZip+'.json.gz')
.pipe(zlib.createGunzip())
.on('data', function (data){
  stringData += data.toString()
})
.on('end', function (){

  console.log("stringData :", stringData)

  fs.writeFile("./test_unzip/"+toUnZip+".json", stringData, (err) => {
    if (!err) console.log(toUnZip+' file has been saved!')
    else console.log(err)
  })

})


/*
⭐️ RESOURCES:
- https://www.w3schools.com/nodejs/ref_zlib.asp
- https://stackoverflow.com/questions/37197010/node-gzip-unzip-file-into-variable
- ⭐️ - const testy = require('gunzip-file')('testGame1.json.gz', 'example.json');
  - 👆 That's npm dependances that'll unzip on spot.
*/
