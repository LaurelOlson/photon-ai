// INSTRUCTIONS
// Step 1: SEED PHOTOS (comment everything else out), then run node seeders/seed.js
// Step 2: Comment out SEED PHOTOS, uncomment GET PHOTO TAGS & SEED TAGS/PHOTO_TAGS, then run node seeders/seed.js
// Step 3: Comment out GET PHOTO TAGS & SEED TAGS/PHOTO_TAGS, uncomment SEED USERS, LIKED_PHOTOS, ADDED_PHOTOS, then run node seeders/seed.js

'use strict';

var fs = require('fs');
var request = require('request');
var split = require('split');
var faker = require('faker');
var models = require(__dirname + '/../models/index.js');
var secret_stuff = require('../secret_stuff.js');
const NUM_PHOTOS = 600;

// SEED PHOTOS

// var readStream = fs.createReadStream('seeders/imglinks.csv');
// var lineStream = readStream.pipe(split());
// lineStream.on('data', function(data) {
//   models.photo.create({ url: data });
// });

// GET PHOTO TAGS & SEED TAGS/PHOTO_TAGS

const MIN_LABEL_SCORE = 0.8;

var visionRequest = {
  "requests":[
    {
      "image": {
        "content": "<paste the contents of your base64-encoded output_file here>"
      },
      "features": [
        {
          "type": "SAFE_SEARCH_DETECTION",
          "maxResults": 5
        },
        {
          "type": "LABEL_DETECTION",
          "maxResults": 10
        },
        {
          "type": "FACE_DETECTION",
          "maxResults": 3
        },
        {
          "type": "LANDMARK_DETECTION",
          "maxResults": 10
        }
      ]
    }
  ]
};

models.photo.findAll( { limit: 50 }).then(function(promises) {
  promises.forEach(function(photo) {
    seedTag(photo);
  });
});

var download = function(uri, filename, callback) {
  request.head(uri, function(err, res, body) {
    if (err) {
      return console.error(err);
    }
    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

function seedTag(photo) {
  var file = 'seeders/temp/photo-' + photo.id + '.jpg'
  download(photo.url, file, convertToBase64);

  function convertToBase64(err, data) {
    if (err) {
      return console.error(err);
    }
    fs.readFile(file, 'base64', sendToGoogleVision);
  }

  function sendToGoogleVision(err, data) {
    if (err) {
      return console.error(err);
    }
    visionRequest.requests[0].image.content = data;
    var request_options = {
      url: 'https://vision.googleapis.com/v1/images:annotate',
      qs: { key: secret_stuff.vision_key },
      method: 'POST',
      json: visionRequest
    };
    request(request_options, parseResponse);
  }

  function parseResponse(error, response, body) {
    if (error) {
      return console.error(error);
    }
    var tags = [];
    var landmarks = body.responses[0].landmarkAnnotations;
    var labels = body.responses[0].labelAnnotations;
    // var safesearch = body.respones[0].safeSearchAnnotation;
    if (labels) {
      labels.forEach(function(label) {
        if (label.score >= MIN_LABEL_SCORE) {
          tags.push({ name: label.description, type: 'label' });
        }
      });
    }
    if (landmarks) {
      landmarks.forEach(function(landmark) {
        tags.push({ name: landmark.description, type: 'landmark' });
      });
    }
    tags.forEach(addTagToDB);
  }

  function addTagToDB(vision_tag) {
    models.tag.findOrCreate({ where: { name: vision_tag.name, type: vision_tag.type } }).then(function(promise) {
      var tag = promise[0];
      photo.addTag(tag).then(function() {
        photo.hasTag(tag).then(console.log);
        tag.hasPhoto(photo).then(console.log);
      });
    });
  }
}

// SEED USERS, LIKED_PHOTOS, ADDED_PHOTOS

// var i = 0;
// while (i < 5) { // Create 5 users
//   models.user.create({
//     firstname: faker.name.firstName(),
//     lastname: faker.name.lastName(),
//     email: faker.internet.email(),
//     password: 'password'
//   }).then(function(user) {
//     var x = 0;
//     while (x < 3) { // Randomly assign 3 photos to each user as like or add
//       var id = Math.floor((Math.random() * NUM_PHOTOS) + 1);
//       if ( id % 2 === 0 ) { // add user as liker
//         models.photo.findById(id).then(function(photo) {
//           photo.addLiker(user).then(function() {
//             photo.hasLiker(user).then(console.log); // should return true
//             user.hasLike(photo).then(console.log); // should return true
//           })
//         })
//       } else { // add user as adder
//         models.photo.findById(id).then(function(photo) {
//           photo.addAdder(user).then(function() {
//             photo.hasAdder(user).then(console.log); // should return true
//             user.hasAdd(photo).then(console.log); // should return true
//           })
//         });
//       }
//       x++;
//     }
//   });
//   i++;
// }
