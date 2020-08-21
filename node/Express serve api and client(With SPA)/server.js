const { app, every, route, api, start } = require('./routes/routeHandler.js')

// Every Request
every(()=>{
  console.log("Ping!")
})

route('/')  //    Root App (Default)
route('/page2') //    /r Redirect App
route('/page3') //    /c Color App

api('/api') // returns test .json

start(8080)
