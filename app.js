var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mysql = require('mysql')

var connection = mysql.createConnection({ // mysql에 사용에 관한 사용자 정보 객체 생성
  host : 192.168.56.101,
  port : 3306,
  user : 'latilt',
  password : 'tjfrud7130',
  database : 'snsdb'
})

connection.connect();

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true})

app.set('view engine', 'ejs')

app.listen('3400', function() {
  console.log('Server Start Port 3400!')
})

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html')
})
