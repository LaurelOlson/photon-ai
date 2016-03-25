var express = require('express');
var router = express.Router();
var models = require('../models/index.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET user photos */
router.get('/users/:id/photos', function(req, res, next) {

  var id = req.params.id;

  models.user.findById(id).then(function(user) {

    user.getAdds().then(addPhotos);
    // user.getLikes().then(addPhotos);

    var user_photos = []

    function addPhotos(photos) {

      photos.forEach(function(photo, i) {
        var photo_hash = {
          id: photo.id,
          url: photo.url,
          tags: []
        };

        user_photos.push(photo_hash)

        photo.getTags().then(function(tags) {
          tags.forEach(function(tag) {
            var tag_hash = {
              name: tag.name,
              type: tag.type
            };

            user_photos[i].tags.push(tag_hash);
          });
          console.log(user_photos);
          res.json(user_photos);
        });

      }); // end photos.forEach
    } // end addPhotos
  });
});

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
