
# OAuth for Facebook & github with
 - Passport
 - Express
 - MongoDB

*NOTE: I did this treehouse tutorial (https://teamtreehouse.com/library/github-authentication) starting with 01_start and pushing through with my github account.

----
### Part 1: 01_start
#### In Termainal    

- *to run in local host after everything installed*
  - *on open of new terminal (NO cd) `sudo mongod`*
  - *THEN: cd to project i.e. (01_start) & `npm start`*

cd to downloaded project directory (01_start in this case)

`npm install`

`npm start`

This will run @localhost:3000. Front-End already done and should look ok.

- `npm install passport —save`
- `npm install express-session --save`
- `npm install connect-mongo --save`

#### In Dev Files

Add to app.js

```javaScript
// line 8,9,10
var passport = require('passport');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

//line 13-19ish...
passport.serializeUser(function(user, done){
  done(null, user._id);
});

passport.deserializeUser(function(userId, done){
  User.findById(userId, done);
});

// around line 33
var sessionOptions = {
  secret: "Bob's super secret!",
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({
    mongooseConnection: db
  })
}

app.use(session(sessionOptions))

//Initialize passport
app.use(passport.initialize());

//Restore session
app.use(passport.session());
```

Sessions handles users not needed to sign in everytime...

!!!seperate ids and secrets from repos!

----
### Part 2:  Setting up a Passport Strategy
*working from 01_start. Not sure if you'll need to modify other project folders...*

#### In terminal

cd to your project directory and install passport strategy...

`npm install passport-github --save`

#### In YOUR github
- Go to "setting", then "OAuth Apps"
  - *note: you can also to go Authorized Auth Apps to see all the apps you've used Github to Authorize through OAuth*  
- Click "register New App"
  - Enter App name: Bookworm
  - & URL: (http://localhost:3000)

Normally you'd have multiple OAuth Apps (development, staging, production)...
  - In this case develoment @ http://localhost:3000

NOW, add a callback route, which will be used by your app to handle the callback
  - http://localhost:3000/auth/github/return

#### In your app.js file

Under where we require passport add the github strategy
`var GitHubStrategy = require('passport-github').Strategy;`

After all dependancies listed starting around line 14, add...

```javaScript
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/auth/github/return'
}, function(accessToken, refreshToken, profile, done){
  if (profile.emails[0]) {
    User.findOneAndUpdate({
      email: profile.emails[0].value
    }, {
      name: profile.displayName || profile.username,
      email: profile.emails[0].value,
      photo: profile.photos[0].value
    }, {
      upsert: true
    }, done);
  } else {
    var noEmailError = ("Your email privacy settings prevent you from loggin in.");
    done(noEmailError, null);
  }
}))
```

^^^ A lot here in this callback i just followed along and didn't quite git.
- looked to have a lot to do with how we retreave and update user information from mongodb

Around line 44 after requiring routes, add auth route
```javaScript
var auth = require('./routes/auth');
```
And around line 85, add...
```javaScript
app.use('/auth', auth)
```

#### In the routes folder, create auth.js

add (again, just followed along...)


```javaScript
var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/login/github',
  passport.authenticate('github'));

router.get('/github/return',
  passport.authenticate('github', {failureRedirect: '/'}),
  function(req, res){
    res.redirect('/profile');
  });

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
})

module.exports = router;
```

#### In Termainal
- make sure `sudo mongod` is all up.

Then, run this command by copying and pasting your ID & secret code from your github applicatoin page
- add .bin/www to fire up the server

`GITHUB_CLIENT_ID=63fa357f4724d84436ff GITHUB_CLIENT_SECRET=35f76aea67a7c176edbeda5cdf237902b1298b35 ./bin/www`

*NOTE: it worked for me and showed me logged in as bob main with my ID pic as well. 
