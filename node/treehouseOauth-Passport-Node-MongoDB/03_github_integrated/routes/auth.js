var express = require('express');
var router = express.Router();
var passport = require('passport');


//GET /auth/login/github
router.get('/login/github',
  passport.authenticate('github'));

router.get('/github/return', 
  passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect to the profile page.
    res.redirect('/profile');
  });

//GET /auth/logout
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});


module.exports = router;
