var express         = require('express');
var app             = express();
var cors            = require('cors');
// var path = require('path');
// var world = require('./demo_db_connection')
// var bodyParser = require("body-parser");
// var mysql = require('mysql');
// var database = require('./config/db')
var usersRouter     = require('./routes/usersRoute');
var ticketRouter    = require('./routes/ticketRouter');
var commentRouter   = require('./routes/commentRouter');

app.use(cors({
    origin: 'http://localhost:5002'
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/users', usersRouter);
app.use('/tickets', ticketRouter);
app.use('/comments', commentRouter);

const port = 3000;

var server = app.listen(port, function () {
    console.log('Node server is running at ' + port + '..');
});