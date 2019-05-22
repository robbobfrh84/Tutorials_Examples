const zlib = require('zlib');
const fs = require('fs');

const toZip = "testGame1"
const gzip = zlib.createGzip()
const read = fs.createReadStream('./test_input/'+toZip+'.json')
const write = fs.createWriteStream('./test_output/'+toZip+'.json.gz')
read.pipe(gzip).pipe(write)

/*
⭐️ RESOURCES:
- https://www.w3schools.com/nodejs/ref_zlib.asp
- https://stackoverflow.com/questions/37197010/node-gzip-unzip-file-into-variable
- ⭐️ - const testy = require('gunzip-file')('testGame1.json.gz', 'example.json');
  - 👆 That's npm dependances that'll unzip on spot.
*/
