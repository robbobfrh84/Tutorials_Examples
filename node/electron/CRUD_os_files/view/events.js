const ticker = document.getElementById('ticker')

const readFile_btn = document.getElementById('readFile_btn')
const readFile_value = document.getElementById('readFile_value')

const readFileDiolage_btn = document.getElementById('readFileDiolage_btn')


readFile_btn.addEventListener('click', async () => {
  const { fileContents, error } = await window.electronAPI.readFile(readFile_value.value)
  ticker.innerHTML = !error ? fileContents : error;
})

readFileDiolage_btn.addEventListener('click', async () => {
  const { fileContents, error } = await window.electronAPI.readFileDialog()
  ticker.innerHTML = !error ? fileContents : error;
})