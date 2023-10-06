const express = require('express')
const { reqTextPrompt } = require('./ai.js')

const buildAPI = function() {
  const app = express()
  const PORT = process.env.PORT || 8080;
  app.get('/favicon.ico', (req, res) => res.status(204));
  app.get('/', (req, res)=>{res.send(`<h1> AI Cards </h1> <hr> <h3> API😊 Nothing at root url, try adding an endpoint`)})
  app.get('/create',  asyncWrapper(getTextPrompt))
  app.get('*', (req, res) => {res.status(404).send('<h1>404<h1>') }) // * ALWAYS HAVE AS LAST ROUTE
  app.listen(PORT, ()=>{ console.log(`🌋  API Server url: http://localhost:${PORT}/ 🏡`) })
}

async function getTextPrompt(req, res) {
  res.header("Access-Control-Allow-Origin", "*")
  const response = await reqTextPrompt( req.query )
  return { endpoint: "create", request: req.query, response }
}

/* ⚙️ toolkit 🛠️ */
function asyncWrapper(func) {
  return (req, res, next) => {
    return Promise.resolve(func(req, res))
      .then((result) => res.send(result))
      .catch((err) => next(err))
  }
}

module.exports = { buildAPI }