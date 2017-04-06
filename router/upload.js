/**
 * Created by chanwoopark on 2017. 4. 3..
 */
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mysql = require('mysql')
var router = express.Router()
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var session = require('express-session')
var flash = require('connect-flash')
var mysql = require('mysql');
var config = require('../config.js')
var path = require('path');

var connection = mysql.createConnection({
    host : config.db.host,
    port : config.db.port,
    user : config.db.user,
    password : config.db.password,
    database : config.db.database
})
connection.connect();


router.post('/',function(req,res){
    var user = req.user;
    var data = req.body;
    var content = data.content;
    console.log(content);

    var query = connection.query('insert into post (userId,postTime,likeNum,content) values ("'+user+'",now(),"'+0+'","'+content+'")', function(err,rows){
        if(err){throw err;}
    });
    res.send("upload reponse");
})


module.exports = router;