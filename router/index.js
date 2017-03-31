var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');
var join = require('./join')
var login = require('./login')
var logout = require('./logout')

//url routing
router.get('/', function(req, res){
	res.sendFile(path.join(__dirname, '../public/main.html'))
});

router.use('/join', join)
router.use('/login', login)
router.use('/logout', logout)



module.exports = router;







