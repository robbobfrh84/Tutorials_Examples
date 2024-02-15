const { app, BrowserWindow, ipcMain } = require('electron/main')
const path = require('node:path')
const electronReload = require('electron-reload')

electronReload(__dirname)

const { 
  createFile, 
  readFile, 
  updateFile, 
  deleteFile,
  readFileDialog 
} = require('./controller/crud_file.controller.js')

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 737,
    height: 850,
    x: 30,
    y: 0,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  mainWindow.loadFile('view/index.html')
}

app.whenReady().then(() => {
  ipcMain.handle('dialog:createFile', createFile)
  ipcMain.handle('dialog:readFile', readFile)
  ipcMain.handle('dialog:updateFile', updateFile)
  ipcMain.handle('dialog:deleteFile', deleteFile)
  ipcMain.handle('dialog:readFileDialog', readFileDialog)
  createWindow()
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})