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

app.listen('3000', function() {
  console.log('Server Start Port 3000!')
})

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/main.html')
})

app.get('/main', function(req, res) {
  var queryString = 'select name, img, date_format(postTime, "%Y-%m-%d / %H:%i") as postTime, likeNum, content, postNum from USER u join post p on u.id = p.userId where u.id = ? order by p.postTime desc limit ?, 5;'
  
  if(!req.user) return res.redirect('/login')
  
  var query = connection.query(queryString, [req.user, 0], function(err, rows) {
    if(err) throw err

    if(rows) {
      return res.render('main.ejs', {'id' : req.user, 'contents' : rows})
    } else {
      console.log('no')
      return res.render('main.ejs')
    }
  })
})

app.post('/pull', function(req, res) {
  var queryString = 'select name, img, date_format(postTime, "%Y-%m-%d / %H:%i") as postTime, likeNum, content, postNum from USER u join post p on u.id = p.userId where u.id = ? order by p.postTime desc limit ?, 5;'
  
  console.log(req.body)
  var query = connection.query(queryString, [req.user, req.body.count * 5], function(err, rows) {
    if(err) throw err

    if(rows) {
      return res.json(rows)
    }
    

  })
})
