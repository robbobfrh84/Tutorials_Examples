const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
  createFile: (fileName) => ipcRenderer.invoke('dialog:createFile', fileName),
  readFile: (fileName) => ipcRenderer.invoke('dialog:readFile', fileName),
  updateFile: (fileName) => ipcRenderer.invoke('dialog:updateFile', fileName),
  deleteFile: (fileName) => ipcRenderer.invoke('dialog:deleteFile', fileName),
  readFileDialog: () => ipcRenderer.invoke('dialog:readFileDialog'),
})