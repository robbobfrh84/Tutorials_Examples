# Deploy React and Express to Heroku

Resource: https://daveceddia.com/deploy-react-express-app-heroku/

# Set up code base and api

Command Line
* `mkdir my-api-heroku`
* `cd my-api-heroku`
* `npm init -y`
* `sudo npm add express password-generator`
* `touch index.js`

Paste code into index.js

```JavaScript
const express = require('express');
const path = require('path');
const generatePassword = require('password-generator');
const app = express();
app.use(express.static(path.join(__dirname, 'client/build')));
app.get('/api/passwords', (req, res) => {
  const count = 5;
  const passwords = Array.from(Array(count).keys()).map(i =>
    generatePassword(12, false)
  )
  res.json(passwords);
  console.log(`Sent ${count} passwords`);
});
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});
const port = process.env.PORT || 5000;
app.listen(port);
console.log(`Password generator listening on ${port}`);
```

Paste code into package.json
* 🚨 NOTE: place your project name for "name": "Your-project-name-here"

```json
{
  "name": "Your-project-name-here",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.16.3",
    "password-generator": "^2.2.0"
  }
}
```

* `npm start`

Visit: http://localhost:5000/api/passwords and see an array of 5 generated passwords.

# Set Up Heroku
* `git init`
* `echo node_modules > .gitignore`
* `git add .`
* `git commit -m "Initial commit"`
* `heroku create`
* `git push heroku master`

Now, visit: https://rocky-fjord-22520.herokuapp.com/api/passwords

# Set up React
* `sudo npm install -g create-react-app`
* `create-react-app client`

Add to client/package.json > `"proxy": "http://localhost:5000"`

Replace code in client/src/app.js

```
import React, { Component } from 'react';
import './App.css';

class App extends Component {
  // Initialize state
  state = { passwords: [] }

  // Fetch passwords after first mount
  componentDidMount() {
    this.getPasswords();
  }

  getPasswords = () => {
    // Get the passwords and store them in state
    fetch('/api/passwords')
      .then(res => res.json())
      .then(passwords => this.setState({ passwords }));
  }

  render() {
    const { passwords } = this.state;

    return (
      <div className="App">
        {/* Render the passwords if we have them */}
        {passwords.length ? (
          <div>
            <h1>5 Passwords.</h1>
            <ul className="passwords">
              {/*
                Generally it's bad to use "index" as a key.
                It's ok for this example because there will always
                be the same number of passwords, and they never
                change positions in the array.
              */}
              {passwords.map((password, index) =>
                <li key={index}>
                  {password}
                </li>
              )}
            </ul>
            <button
              className="more"
              onClick={this.getPasswords}>
              Get More
            </button>
          </div>
        ) : (
          // Render a helpful message otherwise
          <div>
            <h1>No passwords :(</h1>
            <button
              className="more"
              onClick={this.getPasswords}>
              Try Again?
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default App;
```

Replace code in client/src/app.css

```css
.App {
  text-align: center;
  font-family: "Courier New", monospace;
  width: 100%;
}

h1 {
  font-weight: normal;
  font-size: 42px;
}

.passwords {
  list-style: none;
  padding: 0;
  font-size: 32px;
  margin-bottom: 2em;
}

.more {
  font-size: 32px;
  font-family: "Courier New", monospace;
  border: 2px solid #000;
  background-color: #fff;
  padding: 10px 25px;
}
.more:hover {
  background-color: #FDD836;
}
.more:active {
  background-color: #FFEFA9;
}
```

Remove line in client/src/index.js > `registerServiceWorker();`
* `npm start`

Open Tab ...
* `cd client`
* `npm start`

### Updating heroku, add this script to your....
```json
"scripts": {
  "start": "node index.js",
  "heroku-postbuild": "cd client && npm install && npm run build"
}
```

Deploy
* `git add .`
* `git commit -m "Ready for awesome"`
* `git push heroku master`
