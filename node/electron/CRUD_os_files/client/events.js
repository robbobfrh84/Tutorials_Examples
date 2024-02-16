async function createFile() {
  const { success, error } = await window.electronAPI.createFile(createFile_value.value)
  if (!error) { 
    readFiles()
    alert(success) 
    updateFileContents("", createFile_value.value) 
  } else { alert(error) }
}

async function readFile() {
  const { fileContents, error } = await window.electronAPI.readFile(readFile_value.value)
  if (!error) { updateFileContents(fileContents, readFile_value.value) } else { alert(error) }
}

async function updateFile() {
  const { success, error } = await window.electronAPI.updateFile(
    openedFileName.innerHTML,
    fileContentBox.value,
    openedFileName.root
  )
  if (!error) { 
    alert(success) 
    updateFileContents(fileContentBox.value, openedFileName.innerHTML)
  } else { alert(error) }
}

async function deleteFile() {
  console.log('deleteFile_value:',deleteFile_value.value)
  const { success, error } = await window.electronAPI.deleteFile(deleteFile_value.value)
  if (!error) { 
    readFiles()
    alert(success) 
  } else { alert(error) }
}


/* ⭐️ Additional File Services */

async function readFileDialog(fileName) {
  const { fileContents, filePath, error } = await window.electronAPI.readFileDialog()
  if (!error) { updateFileContents(fileContents, filePath, true) } else { alert(error) }
}

async function readFiles() {
  console.log('readFiles')
  const { files, error } = await window.electronAPI.readFiles()
  if (!error) { updateFiles(files) } else { alert(error) }

}