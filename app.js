'use strict';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var FacebookStrategy = require('passport-facebook').Strategy;
var models = require('./models/index.js');
var configAuth = require('./config/auth');

var routes = require('./routes/index'); // pass in fully configured passport for use in routing
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(cookieParser());
// app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// passport stuff
app.use(session({ 
  secret: 'suchsecretsuchsession',
  resave: true,
  saveUninitialized: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());

app.use('/', routes);
app.use('/users', users);

// serialize user for the session
passport.serializeUser(function(user, done) {
  console.log('\n user serialized \n');
  done(null, user.id);
});

// deserialize the user
passport.deserializeUser(function(id, done) {
  models.user.findById(id).then(function(err, user) {
    console.log('\n user deserialized \n');
    done(err, user);
  });
});

passport.use('facebook', new FacebookStrategy({
    clientID: configAuth.facebookAuth.clientID,
    clientSecret: configAuth.facebookAuth.clientSecret,
    callbackURL: configAuth.facebookAuth.callbackURL
  },

  function(token, refreshToken, profile, done) {
    process.nextTick(function() {
      // console.log(profile);
      models.user.findOne({ where: { fbook_id: profile.id } }).then(function(err, user) {
        if (err)
          return done(err);

        if (user) {
          console.log(user);
          return done(null, user);
        } else {
          models.user.create({
            name: profile.displayName,
            fbook_id: profile.id,
            fbook_token: token
          }).then(function(err, newUser) {
            return done(null, newUser);
          });
        }
      });
    });
  }
));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

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

module.exports = app;
