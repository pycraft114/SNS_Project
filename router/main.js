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

var checkUser = function(req, res, next) {
  
  var query = connection.query('select * from USER where id=?', [req.id], function(err, rows){
    if(err) throw err

    if(!rows.length) {
      return res.redirect('/login')
    } else {
      req.name = rows[0].name
      return next()
    }
  })
}

router.get('/', checkUser, function(req, res) {
  
  var queryString = 'select name, img, date_format(postTime, "%Y-%m-%d / %H:%i") as postTime, likeNum, content, postNum from USER u join post p on u.id = p.userId where u.id = ? order by p.postTime desc limit ?, 5;'
  
  var query = connection.query(queryString, [req.id, 0], function(err, rows) {
    if(err) throw err
    
    if(req.user !== req.id) {
      
      return res.render('main.ejs', {'id' : req.name, 'name' : null, 'contents' : rows})
    } else {
      
      return res.render('main.ejs', {'id' : null, 'name' : req.name, 'contents' : rows})
    }
  })
})

module.exports = router

