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

var connection = mysql.createConnection({
  host : config.db.host,
  port : config.db.port,
  user : config.db.user,
  password : config.db.password,
  database : config.db.database
})

connection.connect()

router.get('/', function(req, res) {
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

module.exports = router

