var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mysql = require('mysql')

var connection = mysql.createConnection({ // mysql에 사용에 관한 사용자 정보 객체 생성
  host : '192.168.56.101',
  port : 3306,
  user : 'test',
  password : 'pw1234',
  database : 'snsdb'
})

connection.connect()

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.set('view engine', 'ejs')

app.listen('3000', function() {
  console.log('Server Start Port 3000!')
})

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/main.html')
})

app.get('/main', function(req, res) {
  var query = connection.query('select name, img, date_format(postTime, "%Y-%m-%d / %H:%i") as postTime, likeNum, content from user u join post p on u.id = p.userId order by p.postTime desc limit 5;', function(err, rows) {
    if(err) throw err

    if(rows) {
      return res.render('main.ejs', {'id' : "test" , 'contents' : rows})
    } else {
      return res.render('main.ejs')
    }
  })
})

app.post('/pull', function(req, res) {
  var query = connection.query('select name, img, date_format(postTime, "%Y-%m-%d / %H:%i") as postTime, likeNum, content from user u join post p on u.id = p.userId order by p.postTime desc limit 5;', function(err, rows) {

  })
})
