const express = require("express")
const path = require("path")
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static("public"));

let users = [{ name: "Sally", favColor: "Blue" }]

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
* * * * *                      Same Origin Served                      * * * * *
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "/", "index.html"))
})

app.get("/api", function(req, res) {
  res.json({
    route: req.url,
    method: req.method,
    emoji: "🎉",
    users: users
  })
})

app.post("/api", function(req, res) {
  users.push(req.body)
  res.json({
    route: req.url,
    method: req.method,
    emoji: "📪",
    users: users
  })
})

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
* * * * *                  ALLOW CROSS ORIGIN ROUTES                   * * * * *
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

app.get("/api/Access-Control-Allow-Origin", function(req, res) {
  res.header("Access-Control-Allow-Origin", "*")
  res.json({
    route: req.url,
    method: req.method,
    emoji: "🎉",
    "Access-Control-Allow-Origin": "*",
    users: users
  })
})

app.post("/api/Access-Control-Allow-Origin", function(req, res) {
  console.log(req)
  res.header("Access-Control-Allow-Origin", "*")
  users.push(JSON.parse(Object.keys(req.body)[0])) // this works, but's it's really odd/hacky and I couldn't figure it out any other way.
  res.json({
    route: req.url,
    method: req.method,
    emoji: "📪",
    users: users
  })
})

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
* * * * *                        START SERVER                          * * * * *
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
