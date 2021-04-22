function readFile(filename, callback) {
  const fileContents = fs.readFileSync(filename, 'utf8', function (err,data) {
    if (err) { return console.log(err) }
    return data
  });
  return fileContents
}

/*
  👇Saving this just to reference
  how to read files interanlly
  on node side 👀
*/

// module.exports = {
//   read: ()=>{
//     const fileContents = fs.readFileSync('./files/file_to_read.txt', 'utf8', function (err,data) {
//       if (err) { return console.log(err) }
//       return data
//     });
//     return fileContents
//   }
// }
