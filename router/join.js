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
	console.log(req.flash('error'))
	var msg = "";
	var errMsg = req.flash('error')
	if(errMsg) msg = errMsg;
	console.log('msg' + msg)
	res.render('join.ejs', {'msg':msg});
});

passport.serializeUser(function(user, done){
	console.log('passport session save:', user.id)
	done(null, user.id)
})

passport.deserializeUser(function(id, done){
	console.log('passport session get id:', id)
	done(null, id);
})

passport.use('local-join', new LocalStrategy({
		usernameField: 'id',
		passwordField: 'password',
		passReqToCallback: true
	},function(req, id, password, done){
		var query = connection.query('select * from USER where id=?', [id], function(err, rows){
			if(err) return done(err);

			if(rows.length){
				console.log('existed user')
				return done(null, false, {message: '사용중인 아이디임'})
			} else {
				var sql = {id: id, pw:password, name:req.body.name}
				var query = connection.query('insert into USER set ?', sql, function(err, rows){
					if(err) throw err;

					console.log('ok')
					return done(null, {'id':id});
				})
			}
		})
	}
));
/*
router.post('/', passport.authenticate('local-join', {
	successRedirect: '/main',
	failureRedirect: '/join',
	failureFlash: true })
)*/
router.post('/', function(req, res, next){
	passport.authenticate('local-join', function(err, user, info){
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






