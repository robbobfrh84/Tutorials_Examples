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
