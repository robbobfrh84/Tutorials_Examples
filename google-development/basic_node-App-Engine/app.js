'use strict';

const express = require('express');

const PORT = process.env.PORT || 8080;

const app = express();

var api = {
  name: "Something Cool",
  number: 49
}

app.get('/', (req, res) => {
  res
    .status(200)
    .sendFile('index.html', {root: __dirname })
});

app.get('/api', (req, res) => {
  res
    .status(200)
    .json(api)
    .end();
});

app.get('/api/run/km/:num', (req, res) => {
  let obj = {
    km: req.params.num,
    mi: req.params.num * 0.621371
  }
  res
    .status(200)
    .json(obj)
    .end();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
