
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mysql = require('mysql')
var router = require('./router/index')
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var session = require('express-session')
var flash = require('connect-flash')

var connection = mysql.createConnection({ // mysql에 사용에 관한 사용자 정보 객체 생성
  host : '192.168.56.101',
  port : '3306',
  user : 'test',
  password : 'pw1234',
  database : 'snsdb'
})

connection.connect()

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.set('view engine', 'ejs')

app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

app.use(router)

app.listen('3400', function() {
  console.log('Server Start Port 3400!')
})

app.get('/main', function(req, res) {
	console.log(req.session.passport.user)
	res.render('main.ejs', {'id': req.session.passport.user})
})

