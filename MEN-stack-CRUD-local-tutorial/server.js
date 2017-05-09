const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectID
const url = 'mongodb://localhost:27017/men-crud-basics'
var db

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', (req, res)=>{ res.sendFile(__dirname + '/public/index.html') })

MongoClient.connect(url, (err, database)=>{
  if (err) return console.log(err)
  db = database
  app.listen(3000, ()=>{
    console.log('Connected to Server @ :3000')
  })
});
 /**** HTML FORM POST REQUEST ONLY*****/
app.post('/quotes/form', (req, res)=>{
  db.collection('quotes').save(req.body, (err, results) => {
    if (err) console.log(err)
    res.redirect('/')
  })
})

/**** JS onClick POST REQUEST ONLY*****/
app.post('/quotes', (req, res)=>{
  db.collection('quotes').save(req.body, (err, results) => {
    if (err) console.log(err)
    res.send(results.ops[0])
  })
})

app.get('/quotes', (req, res)=>{
  db.collection('quotes').find().toArray((err, result)=>{
    if (err) return console.log(err)
    res.send(result)
  })
})

app.put('/quotes', (req, res)=>{
  db.collection('quotes')
    .update(
      {_id: ObjectId(req.body._id)},
      { $set: { name: req.body.name, quote: req.body.quote } },
      (err, result) => {
        if (err) return res.send(err)
        res.send(result)
      }
    )
})

app.delete('/quotes', (req, res)=>{
  db.collection('quotes')
    .remove(
      {_id: ObjectId(req.body._id)},
      (err, result) => {
        if (err) return res.send(err)
        res.send(result)
      }
    )
})
