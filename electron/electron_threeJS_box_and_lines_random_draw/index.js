const { app, BrowserWindow } = require('electron')
const url = require('url')
const path = require('path')

function createWindow() {
   win = new BrowserWindow({
     width: 800,
     height: 900
   })
   win.loadURL(url.format ({
    pathname: path.join(__dirname, 'ui/index.html'),
    protocol: 'file:',
    slashes: true
   }))
}

app.on('ready', createWindow)


//
// const {app, BrowserWindow} = require('electron')
//
// let mainWindow
//
// app.on('window-all-closed', function() {
//   if (process.platform != 'darwin')
//     app.quit();
// });
//
// app.on('ready', function() {
//   mainWindow = new BrowserWindow({
//     width: 800,
//     height: 600,
//     // frame:false,
//     // transparent: true
//   })
//   // mainWindow.setIgnoreMouseEvents(true)
//   mainWindow.loadURL('file://' + __dirname + '/ui/index.html')
//   mainWindow.on('closed', function() {
//     mainWindow = null
//   });
// });
