var zlib = require('zlib');
var fs = require('fs');


// const toZip = "testGame1"
// var gzip = zlib.createGzip()
// var r = fs.createReadStream('./test_input/'+toZip+'.json')
// var w = fs.createWriteStream('./'+toZip+'.json.gz')
// r.pipe(gzip).pipe(w)


const toUnZip = "testGame1"
// const inflate = zlib.createInflate();
// const inp = fs.createReadStream('./'+toUnZip+'.json.gz');
// const out = fs.createWriteStream('file1_inflated.json');
//
// inp.pipe(inflate).pipe(out);

var d = '';
fs.createReadStream('./'+toUnZip+'.json.gz')
.pipe(zlib.createGunzip())
.on('data', function (data){
  d += data.toString()
})
.on('end', function (){
  console.log(d);
})


/*
⭐️ RESOURCES:
- https://www.w3schools.com/nodejs/ref_zlib.asp
- https://stackoverflow.com/questions/37197010/node-gzip-unzip-file-into-variable
- ⭐️ - const testy = require('gunzip-file')('testGame1.json.gz', 'example.json');
  - 👆 That's npm dependances that'll unzip on spot.
*/
