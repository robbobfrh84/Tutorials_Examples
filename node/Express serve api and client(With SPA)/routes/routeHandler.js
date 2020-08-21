const express = require('express')
const cors = require('cors')
const app = express()
const path = require('path')

app.use(express.static('client'))

const every = function(callback) {
  app.use((req, res, next) => {
    callback()
    next()
  })
}

const route = function(route) {
  app.get(route, function(req, res) {
    console.log("route: ", route)
    res.sendFile(path.join(__dirname + '/../client/index.html'))
  })
}

const api = function(endpoint){
  app.get(endpoint, cors(), (req, res) => {
    console.log("api endpoint:", endpoint)
    return res.json( { data: "hello" } )
  });
}

const start = function(port) {
  app.listen(port) // $`lsof -i :8080` $`sudo kill -9 <PID>`
  console.log("served: ", "http://localhost:"+port)
}

module.exports = { app, every, route, api, start }
