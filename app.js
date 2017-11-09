var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
//var favicon = require('static-favicon');
var logger = require('morgan');
//var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var passport = require('passport');
global.loggedIn = null;


// local requirements
var routes = require('./routes/index');
var login = require('./routes/login');
var newUser = require('./routes/new-user');
var home = require('./routes/home');
var saveUser = require('./routes/save-user');
var users = require('./routes/users');
var navbar = require('./routes/navbar');
var sidebar = require('./routes/sidebar');
var footer = require('./routes/footer');
var deleteUser = require('./routes/delete-user');
var savedUser = require('./routes/saved-user');
var gitStatus = require('./routes/git-status');
var gitPull = require('./routes/git-pull');
var gitPush = require('./routes/git-push');
var gitCommit = require('./routes/git-commit');


var configDB = require('./models/database.js');

// mongo connect 

mongoose.connect(configDB.url, { useMongoClient: true });

// start express

var app = express();


// passport configuration

app.use(passport.initialize());
    // used to serialize the user for the session
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

    // used to deserialize the user
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');



//app.use(favicon());
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/login', login);
app.use('/new-user', newUser);
app.use('/save-user', saveUser);
app.use('/home', home)
app.use('/users', users);
app.use('/navbar', navbar);
app.use('/sidebar', sidebar);
app.use('/footer', footer);
app.use('/delete-user',deleteUser);
app.use('/saved-user',savedUser);
app.use('/git-status',gitStatus);
app.use('/git-pull',gitPull);
app.use('/git-push',gitPush);
app.use('/git-commit',gitCommit);

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.listen(3000, function () {
    console.log("Application started...")
});

module.exports = app;
