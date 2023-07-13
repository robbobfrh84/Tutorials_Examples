const express = require("express")
const path = require("path")
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static("public"));

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "/", "index.html"))
})

app.post("/api", function(req, res) {
  console.log("Server recieved Post request:", req.body)
  res.json({
    message_received: req.body,
    emoji: "🎉",
  })
})

app.listen(3000, function() {
  console.log(`🌋  API Server on PORT: 3000 🏡`)
})
