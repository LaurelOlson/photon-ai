var express = require('express');
var router = express.Router();
var models = require('../models/index.js');
var sequelize = require('sequelize');
var Promise = sequelize.Promise;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET user photos */
router.get('/users/:id/photos', function(req, res, next) {
  var id = req.params.id;
  models.user.findById(id)
    .then(function(user) {
      user.getLikes()
        .then(addPhotos)
          .then(function(user_photos) { 
            console.log(user_photos); 
            res.json(user_photos); 
          });
    });
});

function addPhotos(photos) {
  // Make addPhotos return a promise. 
  // This means when we call .then(addPhotos) on line 16, add photos won't return until the promise is resolved.
  // Once the promise is resolved, .then(function(user_photos) { .. }) will run, taking in the argument of resolve_photos(), user_photos.
  // return console.log(photos);
  return new Promise(function(resolve_photos, reject_photos) {
    
    var user_photos = [];
    // Iterate over photos as promises.
    // This way, we wait until the photo promise is resolved before moving on to the next photo
    Promise.each(photos, function(photo) {
      return new Promise(function(resolve_photo, reject_photo) {
        var photo_hash = {
          id: photo.id,
          url: photo.url,
          tags: []
        };

        user_photos.push(photo_hash);

        photo.getTags().then(function(tags) {
          // Iterate over tags as promises
          // This allows us to call .then() on each() so that we wait until the loop finishes before moving on
          Promise.each(tags, function(tag) {
            var tag_hash = {
              name: tag.name,
              type: tag.type
            };
            photo_hash.tags.push(tag_hash);
          }).then(resolve_photo); // once we've iterated over each tag, move onto the next photo
          // tags.forEach(function(tag) {
          //   var tag_hash = {
          //     name: tag.name,
          //     type: tag.type
          //   };
          //   photo_hash.tags.push(tag_hash);
          // });
        })
        // .then(resolve_photo); // once we've iterated over each tag, move onto the next photo
      }); // promise 

    }).then(function() { resolve_photos(user_photos); }); // end photos.forEach
  }); // end promise returned by addPhotos
} // end addPhotos

router.get('/photos/:id', function(req, res, next) {
  var id = req.params.id;
  models.photo.findById(id).then(function(photo) {

    res.json(photo);
  });
});

/* POST new photo */
router.post('/user/:id/addedphotos', function(req, res) {
  models.photo.create({
    url: req.body.url
  }).then(function(photo) {
    models.user.findById(req.params.id).then(function(user) {
      user.addLike(photo);
    });
    res.json(photo);
  });
});

module.exports = router;
