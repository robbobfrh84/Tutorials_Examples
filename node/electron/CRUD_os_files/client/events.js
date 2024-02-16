// 🔥 Just make a normal function
readFile_btn.addEventListener('click', async () => {
  const readFile_value = document.getElementById('readFile_value')
  const { fileContents, error } = await window.electronAPI.readFile(readFile_value.value)
  if (!error) { updateFileContents(fileContents, readFile_value.value) } else { alert(error) }
})
 
// 🔥 Just make a normal function
readFileDiolage_btn.addEventListener('click', async () => {
  const { fileContents, error } = await window.electronAPI.readFileDialog()
  if (!error) { updateFileContents(fileContents) } else { alert(error) }
})

async function updateFile() {
  const fileContentBox = document.getElementById('fileContentBox')
  console.log(fileContentBox.value)
  const { fileContents, error } = await window.electronAPI.updateFile(
    fileContentBox.value,
    readFile_value.value
  )
  if (!error) { updateFileContents(fileContents, readFile_value.value) } else { alert(error) }
}