var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	if (global.loggedIn) {
		res.render('compare-with-master', { title: 'Express' });	
	}
	else {
		console.log(res)
		res.send(401)
	}	 
});

module.exports = router;
