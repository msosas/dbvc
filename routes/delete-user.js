var express = require('express');
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var User = require('../models/users')

var router = express.Router();

/* DELETE user. */
router.post('/', function(req, res) {
	var id = req.body.id;
	
	User.findOne({_id: id}, function (err,data) {
		if (err) {
			res.send(err);
		}
	}).remove().exec();
	res.send("OK");
});

module.exports = router;
