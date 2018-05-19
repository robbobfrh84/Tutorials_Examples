# How to get create-react-app to work with a Node.js back-end API

Resource: https://medium.freecodecamp.org/how-to-make-create-react-app-work-with-a-node-backend-api-7c5c48acb1b0

----
### Getting Started (In Terminal)

Create React App
- `create-react-app example-create-react-app-express`
- `cd example-create-react-app-express`
- `mkdir client`

In root package.json > past code from the "Resource:" link above

Install nodemon & yard
* `sudo npm i nodemon -g`
* `yarn` < ⚠️ Installs Yarn.

Create file server.js > past code from the "Resource:" link above

Run the local server
* `node server.js`
* visit: http://localhost:5000/api/hello

### The React App

- IMPORTANT: match the file structure to the IMAGE on the "Resource:"" link.

Navigate to src/App.js
* change the code in bold from > "Resource:" link above
* careful there's some hidden bolds there....

for BOTH package.json files add `"proxy": "http://localhost:5000/"` to end.

Now, `yarn dev` should fire it up!

----
//
//
//FOUND THIS AFTER QUITING LOOKS PROMISING! https://devcenter.heroku.com/articles/deploying-nodejs

"engines": {
  "node": "4.1.1"
}







//
//
//
### Moving to heroku

* `heroku create some-app-name`
* `heroku git:remote -a some-app-name` moves you into specific app.
* ALSO, to check what you're in it by running `heroku domains`
//
//
* `git add .`
* `git commit -m "Procfile"`
//
//
* `git push heroku master`
//
/
/
