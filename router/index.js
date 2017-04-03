var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');
var join = require('./join')
var login = require('./login')
var logout = require('./logout')

//url routing
router.get('/', function(req, res){
	res.render('login.ejs',{'msg':""});

});

router.use('/join', join)
router.use('/login', login)
router.use('/logout', logout)

module.exports = router;







