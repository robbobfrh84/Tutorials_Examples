const { dialog } = require('electron/main')
const fs = require('fs')
const { CONFIG } = require("../config.js")

async function createFile(event, fileName) {
  if (!fs.existsSync(CONFIG.fileFolder+fileName) ) {
    try {
      await fs.promises.writeFile(CONFIG.fileFolder+fileName, "")
      return { success: "Successfully created file: "+fileName }
    } catch(error) { return { error } }
  } else { return { error: fileName+" already exists !"} }
}

async function readFile(event, fileName) {
  try {
    const fileContents = await fs.promises.readFile(CONFIG.fileFolder+fileName, 'utf8')
    return { fileContents }
  } catch(error) { return { error } }
}

async function updateFile(event, fileName, content, root) {
  try {
    const dir = root ? fileName : CONFIG.fileFolder+fileName
    await fs.promises.writeFile(dir, content)
    return { success: "Successfully updated file: "+fileName }
  } catch(error) { return { error } }
}

async function deleteFile(event, fileName) {
  try {
    await fs.promises.unlink(CONFIG.fileFolder+fileName);
    return { success: "Successfully deleted file: "+fileName }
  } catch(error) { return { error } }
}


/* ⭐️ Extra File System Operations */

async function readFileDialog() {
  const { canceled, filePaths } = await dialog.showOpenDialog()
  if (!canceled) {
    try {
      const fileContents = await fs.promises.readFile(filePaths[0], 'utf8')
      return { fileContents, filePath: filePaths[0] }
    } catch(error) { return { error } }
  }
}

async function readFiles() {
  try {
    const files = await fs.promises.readdir('./files')
    return { files }
  } catch(error) { return { error } }
}

module.exports = { 
  createFile, 
  readFile, 
  updateFile, 
  deleteFile, 
  readFileDialog,
  readFiles 
}