const { app, BrowserWindow } = require('electron')
const url = require('url')
const path = require('path')

function createWindow() {
   win = new BrowserWindow({
     width: 800,
     height: 900,
     x: 50,
     y: 0
   })
   win.loadURL(url.format ({
    pathname: path.join(__dirname, 'client/index.html'),
    protocol: 'file:',
    slashes: true
   }))
}

app.on('ready', createWindow)