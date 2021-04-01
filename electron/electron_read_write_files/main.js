const {app, BrowserWindow} = require('electron')
const url = require('url')
const path = require('path')

function createWindow() {
   win = new BrowserWindow({
     width: 800, height: 800
   })
   win.loadURL(url.format ({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
   }))
}

app.on('ready', createWindow)

/*
  👇Saving this just to reference
  how to read files interanlly
  on node side 👀
*/

// const read_file = require("./read_file.js")
// console.log("read_file :", read_file.read())
