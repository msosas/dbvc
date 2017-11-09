var express = require('express');
var router = express.Router();

/* GET saved user page. */
router.get('/', function(req, res) {
	if (global.loggedIn) {
		res.render('saved-user', { title: 'Express' });	
	}
	else {
		console.log(res)
		res.send(401)
	}	 
});

module.exports = router;
