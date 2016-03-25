'use strict';

var faker = require('faker');
var models = require(__dirname + '/../models/index.js');
const NUM_PHOTOS = 600;

// SEED USERS, LIKED_PHOTOS, ADDED_PHOTOS

var i = 0;
while (i < 25) { // Create 25 users
  models.user.create({
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    password: 'password' 
  }).then(function(user) {
    var x = 0;
    while (x < 25) { // Randomly assign 25 photos to each user as like or add
      var id = Math.floor((Math.random() * NUM_PHOTOS) + 1);
      if ( id % 3 === 0 ) { // add user as liker
        models.photo.findById(id).then(function(photo) {
          photo.addLiker(user).then(function() {
            photo.hasLiker(user).then(console.log); // should return true
            user.hasLike(photo).then(console.log); // should return true
          })
        })       
      } else { // add user as adder
        models.photo.findById(id).then(function(photo) {
          photo.addAdder(user).then(function() {
            photo.hasAdder(user).then(console.log); // should return true
            user.hasAdd(photo).then(console.log); // should return true
          })
        });  
      }
      x++;
    } 
  });
  i++;
} 