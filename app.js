
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')

var index = require('./routes/index');
var signup = require('./routes/signup');
var user = require('./routes/user');
var add = require('./routes/add');
var info = require('./routes/info');
var edit = require('./routes/edit');
var info_me = require('./routes/info_me');
var edit_me = require('./routes/edit_me');

/* grab mongoose */
require("dotenv").load();
var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/members');


var models = require("./models");
var db = mongoose.connection;

// Database Connection
mongoose.connect(process.env.MONGOLAB_URI || process.env.MONGO_URI);
db.on('error', console.error.bind(console, 'Mongo DB Connection Error:'));
db.once('open', function(callback) {
    console.log("Database connected successfully.");
});

// Example route
// var user = require('./routes/user');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Intro HCI secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Add routes here
app.get('/', index.view);

app.get('/user2', user2.view);
app.get('/signup', signup.view);
app.get('/add', add.view);
app.get('/info', info.view);
app.get('/user', user.memberFunctions);
app.get('/edit', edit.view);
app.get('/info_me', info_me.view);
app.get('/edit_me', edit_me.view);



// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
