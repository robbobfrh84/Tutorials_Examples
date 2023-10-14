const express = require('express')
const { ai } = require('./ai.js')

const buildAPI = function() {
  const app = express()
  const PORT = process.env.PORT || 8080;
  app.get('/favicon.ico', (req, res) => res.status(204));
  app.get('/', (req, res)=>{res.send(`<h3> API😊 Nothing at root url, try adding an endpoint`)})
  app.get('/create_object',  asyncWrapper(queryRequest))
  app.get('/create_object_Describe',  asyncWrapper(queryRequest))
  app.get('/create_image',  asyncWrapper(queryRequest))
  app.get('*', (req, res) => {res.status(404).send('<h1>404<h1>') }) // * ALWAYS HAVE AS LAST ROUTE
  app.listen(PORT, ()=>{ console.log(`🌋  API Server url: http://localhost:${PORT}/ 🏡`) })
}

async function queryRequest(req, res) {
  res.header("Access-Control-Allow-Origin", "*")
  const endpoint = req.route.path.split('/')[1]
  const response = await ai[endpoint](req.query)
  return { endpoint, query: req.query, response }
}

/* ⚙️ toolkit 🛠️ */
function asyncWrapper(func) {
  return (req, res, next) => {
    return Promise.resolve(func(req, res))
      .then((result) => res.send(result))
      .catch((err) => res.send({ error: "❌ Oops. 😬 Something went wrong. Please try again..."}))
  }
}

module.exports = { buildAPI }