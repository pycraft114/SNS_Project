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

router.post('/', function(req, res) {
  var queryString = 'delete from post where postNum = ?;'

  var query = connection.query(queryString, [req.body.postNum], function(err, rows) {
    if(err) throw err

    if(rows.affectedRows === 0) {
      return res.json({'result' : false})
    } else {
      return res.json({'result' : true})
    }
  })
})

module.exports = router