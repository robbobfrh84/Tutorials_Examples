const { app, BrowserWindow } = require('electron')
const url = require('url')
const path = require('path')

function createWindow() {
   win = new BrowserWindow({ // mac: 2560 × 1664
     width: 750, height: 900, 
     x: 0, y: 0
   })
   win.loadURL(url.format ({
    pathname: path.join(__dirname, 'client/index.html'),
    protocol: 'file:',
    slashes: true
   }))
}

app.on('ready', createWindow)