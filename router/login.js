var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');
var mysql = require('mysql');

var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var session = require('express-session')
var flash = require('connect-flash')

// DB SETTING
var connection = mysql.createConnection({
	host: '192.168.56.101',
	port: 3306, 
	user: 'test',
	password: 'pw1234',
	database: 'snsdb' 
});
connection.connect();


router.get('/', function(req, res){
	var msg = "";
	var errMsg = req.flash('error')
	if(errMsg) msg = errMsg;
	res.render('login.ejs', {'msg':msg});
});

passport.serializeUser(function(user, done){
	console.log('passport session save:', user.id)
	done(null, user.id)
})

passport.deserializeUser(function(id, done){
	console.log('passport session get id:', id)
	done(null, id);
})

passport.use('local-login', new LocalStrategy({
		usernameField: 'id',
		passwordField: 'password',
		passReqToCallback: true
	},function(req, id, password, done){
		var query = connection.query('select pw from USER where id=?', [id], function(err, rows){
			if(err) return done(err);
			console.log(rows.pw)
			if(rows.length){
				if(password === rows[0].pw){  
				console.log('비밀번호 일치')
				return done(null, {'id':id})
				} else {
				return done(null, false, {message: '비밀번호 다름'})
				}
			} else {
				return done(null, false, {message: '그런 유저 없음'})
			}
		})
	}
));
/*
router.post('/', passport.authenticate('local-login', {
	successRedirect: '/main',
	failureRedirect: '/login',
	failureFlash: true })
)
*/
router.post('/', function(req, res, next){
	passport.authenticate('local-login', function(err, user, info){
		console.log(req);
		if(err) res.status(500).json(err);
		if(!user) return res.status(401).json(info.message);

		req.logIn(user, function(err){
			if(err) { return next(err)};
			return res.json(user);
		})
	})(req, res, next);
})

module.exports = router;

app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());






