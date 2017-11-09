var express = require('express');
var mongoose = require('mongoose');
var User = require('../models/users')

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  User.find(function (err,data) {
  	res.send(data);
  })
});

module.exports = router;
