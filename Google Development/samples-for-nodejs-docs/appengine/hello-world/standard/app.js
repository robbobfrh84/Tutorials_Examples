/**
 * Copyright 2017, Google, Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

// [START gae_node_request_example]
const express = require('express');

const app = express();

var api = {
  name: "Something Cool",
  number: 49
}

app.get('/', (req, res) => {
  res
    .status(200)
    .send('Hello, world!')
    .end();
});

app.get('/html', function(req, res) {
    res.sendFile('index.html', {root: __dirname })
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

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
