const { dialog } = require('electron/main')
const fs = require('fs')

async function createFile(event, fileName) {
  console.log('TO DO! createFile')
}

async function readFile(event, fileName) {
  try {
    const fileContents = await fs.promises.readFile('./files/'+fileName, 'utf8')
    return { fileContents }
  } catch(error) { return { error } }
}

async function updateFile(event, fileName, content) {
  console.log('fileName,content:',fileName,content)

  // const fileContents = await fs.promises.updateFile('./files/'+fileName, 'utf8')

  console.log('TO DO! updateFile')
}

// Maybe?????
// function writeFile(filename, name, number) {
//   if (!fs.existsSync(filename)) {
//     fs.writeFile(filename, '', (err) => {
//        if (err) { console.log(err) }
//     })
//   }
//   return fs.appendFileSync(filename, name + ',' + number + '\n')
// }

async function deleteFile(event, fileName, content) {
  console.log('TO DO! deleteFile')
}

async function readFileDialog() {
  const { canceled, filePaths } = await dialog.showOpenDialog()
  if (!canceled) {
    try {
      const fileContents = await fs.promises.readFile(filePaths[0], 'utf8')
      return { fileContents }
    } catch(error) { return { error } }
  }
}

module.exports = { 
  createFile, 
  readFile, 
  updateFile, 
  deleteFile, 
  readFileDialog 
}