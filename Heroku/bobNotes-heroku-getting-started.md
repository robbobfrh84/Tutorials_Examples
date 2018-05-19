FOUND THIS AFTER QUITING LOOKS PROMISING! https://devcenter.heroku.com/articles/deploying-nodejs

# Getting Started With Node...
Started with... Started With Node 👉 👇 https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up
* Set up Free Account
* Installed heroku via download link.

### In Terminal

`heroku login` > enter email > enter pass

Check that prerequisites installed properly
* `node --version` Must be 8+
* `npm --version` Must be 5+
* `git --version` Must be 2+

Now, install the filebase for the demo app
* cd to a project folder...
* `git clone https://github.com/heroku/node-js-getting-started.git`
* `cd node-js-getting-started`

Create an app on Heroku, which prepares Heroku to receive your source code.
* `heroku create`

Heroku generates a random name (damp-shelf-26389 for mine)
* https://git.heroku.com/damp-shelf-26389.git

Instead I created my own name `bob-main-getting-started1` with...
* https://bob-main-getting-started1.herokuapp.com/
* https://git.heroku.com/bob-main-getting-started1.git
* Be sure to change the app your working on with heroku. In my case I was still on the original i made
  * `heroku git:remote -a bob-main-getting-started1` moves you into specific app.
  * ALSO, to check what you're in run `heroku domains`

Now deploy your code
* `git push heroku master`
* Makes sure at least one instance of the app is running: `heroku ps:scale web=1`
* Go to your url to see your app! OR: `heroku open`

View Logs
* `heroku logs --tail`
* Press `Control+C` to stop streaming the logs.

HERE !!! https://devcenter.heroku.com/articles/deploying-nodejs
