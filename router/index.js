var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');
var join = require('./join')
var login = require('./login')
var logout = require('./logout')
var upload = require('./upload')
var deletePost = require('./delete')
var like = require('./like')
var pull = require('./pull')
var main = require('./main')

//url routing
router.get('/', function(req, res){
	res.render('login.ejs',{'msg':""});

});

router.use('/join', join)
router.use('/login', login)
router.use('/logout', logout)
router.use('/upload',upload)
router.use('/delete', deletePost)
router.use('/like', like)
router.use('/pull', pull)
router.use('/:id', function(req, res, next) {
	req.id = req.params.id
	next()
},main)

module.exports = router;







