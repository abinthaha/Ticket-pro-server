var express = require('express');
var app = express();
var path = require('path');
var world = require('./demo_db_connection')
var bodyParser = require("body-parser");
var mysql = require('mysql');
var database = require('./config/db')
var usersRouter = require('./routes/usersRoute');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/users', usersRouter);

var server = app.listen(3000, function () {
    console.log('Node server is running..');
});