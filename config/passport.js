// Login Strategies

'use strict';

var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
// var GoogleStrategy = require('passport-google').Strategy;

var configDB = require('./database.js');
var Sequelize = require('sequelize');
// var pg = require('pg');
var sequelize = new Sequelize(configDB.url);

var User = sequelize.import('../models/user');
User.sync();

var configAuth = require('./auth');

module.exports = function(passport) {

  // serialize user for the session
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // deserialize the user
  passport.deserializeUser(function(id, done) {
    User.findById(id).then(function(user) {
      done(null, user);
    }).catch(function(e) {
      done(e, false);
    });
  });

  // local login
  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true // allows us to check if a user is logged in or not
  },
  function(req, email, password, done) {
    User.findOne({ where: { localemail: email.toLowerCase() }})
      .then(function(user) {
        if (!user) { // user with that email doesn't exist
          done(null, false, req.flash('loginMessage', 'Invalid email or password'));
        } else if (!user.validPassword(password)) { // password is invalid
          done(null, false, req.flash('loginMessage', 'Invalid email or password'));
        } else { // successful login
          done(null, user);
        }
      })
      .catch(function(e) {
        done(null, false, req.flash('loginMessage', e.name + " " + e.message));
      });
  }));

  // local signup
  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true 
  },
  function(req, email, password, done) {
    User.findOne({ where: { localemail: email.toLowerCase() }})
      .then(function(existingUser) {
        if (existingUser) { 
          return done(null, false, req.flash('loginMessage', 'Email is already taken')); 
        }
        // logged in => so we're connecting a new local account (updating account???)
        if (req.user) {
          var user = req.user;
          user.localemail = email.toLowerCase;
          user.localpassword = User.generateHash(password);
          user.save().catch(function(err) {
            throw err;
          }).then(function() {
            done(null, user);
          });
        } else { // not logged in so create a new user
          var newUser = User.build({ localemail: email.toLowerCase, localpassword: User.generateHash(password) });
          newUser.save().then(function() { 
              done(null, newUser); 
            })
            .catch(function(err) { 
              done(null, false, req.flash('loginMessage', err)); 
            });
        }
      })
      .catch(function(e) {
        done(null, false, req.flash('loginMessage', e.name + " " + e.message));
      });
  }));

  // google
  // passport.use(new GoogleStrategy({
  //   returnURL: configAuth.googleAuth.returnURL,
  //   realm: configAuth.googleAuth.realm
  // },
  // function(req, identifier, profile, done) {
  //   if (!req.user) { // no one's logged in
  //     User.findOne({ where: { google_id: profile.id }}) // try to find the user
  //       .then(function(user) {
  //         if (user) { // user found
  //           if (!user.google_identifier) { // no identifier - user has been unlinked
  //             user.google_identifier = identifier;
  //             // user.name = profile.name.givenName + ' ' + profile.name.familyName;

  //             user.save()
  //               .then(function() { done(null, user); })
  //               .catch(function() {});
  //           } else { // user exists and user already has an identifier
  //             done(null, user);
  //           }
  //         } else { // no user
  //           var newUser = User.build({
  //             google_id: profile.id,
  //             google_identifier: identifier
  //             // name: profile.name.givenName + ' ' + profile.name.familyName
  //           });

  //           newUser.save()
  //             .then(function(user) { done(null, user); })
  //             .catch(function() {});
  //         }
  //       });
  //   } else { // user already exists and is logged in so we need to link accounts
  //     var user = req.user; // pull user from session

  //     user.google_id = profile.id;
  //     user.google_identifier = identifier;
  //     // user.name = profile.name.givenName + ' ' + profile.name.familyName;

  //     user.save()
  //       .then(function(user) { done(null, user); })
  //       .catch(function() {});
  //   }
  // }));

  // facebook
  passport.use(new FacebookStrategy({
    clientID: configAuth.facebookAuth.clientID,
    clientSecret: configAuth.facebookAuth.clientSecret,
    callbackURL: configAuth.facebookAuth.callbackURL,
    passReqToCallback: true // allows us to pass in the req from our route (i.e check if user is logged in or not)
  },
  function(req, token, refreshToken, profile, done) {
    // check if user is already logged in
    if (!req.user) {
      User.findOne({ where: { 'fbook_id': profile.id }})
        .then(function(user) {
          if (user) {
            // user id exists but no token (user was linked but was removed)
            if (!user.fbook_token) {
              user.fbook_token = token;
              user.name = profile.displayName;

              user.save()
                .then(function() { done(null, user); })
                .catch(function() {});
            } else { // user id exists and user already has a token
              done(null, user);
            }

          } else { // no user found so create one
            var newUser = User.build({
              fbook_id: profile.id,
              fbook_token: token,
              name: profile.displayName,
            });
            newUser.save()
              .then(function() { done(null, user); })
              .catch(function() {});
          }
        });
    } else { // user already exists and is logged in so we need to link accounts
      var user = req.user; // pull user from session

      user.fbook_id = profile.id;
      user.fbook_token = token;
      user.name = profile.displayName;

      user.save()
        .then(function() { done(null, user); })
        .catch(function() {});
    }
  }));
};