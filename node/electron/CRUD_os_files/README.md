# Creating, reading, updating and deleting mac os files. 
Note: Hot reload is also added in this example

- `npm init` > tab through defaults.
- `npm install`
- `npm start`

# resources

Read file
- https://www.electronjs.org/docs/latest/tutorial/ipc

Hot reload
- https://www.tutorialspoint.com/hot-reload-in-electronjs
- Just need to add the following to `main.js`

```
const electronReload = require('electron-reload')
electronReload(__dirname) // This will only reload UI if you want. 
require('electron-reload')(__dirname, { // This reloads both. 
  electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
  forceHardReset: true
}) 
```