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

async function updateFile(event, fileName) {
  console.log('TO DO!updateFile')
}

async function deleteFile(event, fileName) {
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