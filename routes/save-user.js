var express = require('express');
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var User = require('../models/users')

var router = express.Router();

/* POST new user. */
router.post('/', function(req, res) {
	var hashedPassword = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null);
	var johnDoe = new User( { name: req.body.name, lastname: req.body.lastname, username: req.body.username, password: hashedPassword } )	
	johnDoe.save(function (err, data) {
		if (err) return console.error(err);
		else {
			res.redirect('saved-user');
		}
	});	
});

module.exports = router;
