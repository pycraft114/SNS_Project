var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');
var mysql = require('mysql');
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var session = require('express-session')
var flash = require('connect-flash')
var multer = require('multer')
var config = require('../config.js')

var storage = multer.diskStorage({
	destination:function(req, file, callback){
		callback(null, 'public/images')
	},
	filename:function(req, file, callback){
		callback(null, file.fieldname + '-' + Date.now() + "." + file.mimetype.split('/')[1])
	}
})
var upload = multer({storage: storage})

var connection = mysql.createConnection({
  host : config.db.host,
  port : config.db.port,
  user : config.db.user,
  password : config.db.password,
  database : config.db.database
})

connection.connect();


router.get('/', function(req, res){
	var msg = "";
	var errMsg = req.flash('error')
	if(errMsg) msg = errMsg;
	res.render('join.ejs', {'msg':msg});
});

passport.serializeUser(function(user, done){
	done(null, user.id)
})

passport.deserializeUser(function(id, done){
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
				return done(null, false, {message: '사용중인 아이디임'})
			} else {
				if(req.file === undefined){
					var filePath = '/images/defalut.jpg';
				}else{
					var filePath = req.file.path;
					filePath = filePath.replace(/public/, '');
				}
				var sql = {id: id, pw:password, name:req.body.name, img:filePath}
				var query = connection.query('insert into USER set ?', sql, function(err, rows){
					if(err) throw err;

					return done(null, {'id':id});
				})
			}
		})
	}
));

router.post('/', upload.single('file'), function(req, res, next){
	passport.authenticate('local-join', function(err, user, info){
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






