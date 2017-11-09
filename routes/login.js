var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/users');

passport.use(new LocalStrategy(
  function(username, password, done) {
    
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.validPassword(password)) { return done(null, false); }
      return done(null, user);
    });
  }
));

router.post('/',
	passport.authenticate('local', { failureRedirect: '/' }),
	function(req,res) {
    loggedIn = req.user;
		res.redirect('/home');
	}
);


module.exports = router;
