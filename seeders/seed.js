// INSTRUCTIONS
// Step 1: SEED PHOTOS (comment everything else out), then run node seeders/seed.js
// Step 2: Comment out SEED PHOTOS, uncomment GET PHOTO TAGS & SEED TAGS/PHOTO_TAGS, then run node seeders/seed.js
// Step 3: Comment out GET PHOTO TAGS & SEED TAGS/PHOTO_TAGS, uncomment SEED USERS, LIKED_PHOTOS, ADDED_PHOTOS, then run node seeders/seed.js

var fs = require('fs');
var request = require('request');
var split = require('split');
var faker = require('faker');
var models = require(__dirname + '/../models/index.js');

// SEED PHOTOS

// var readStream = fs.createReadStream('seeders/imglinks.csv');
// var lineStream = readStream.pipe(split());
// lineStream.on('data', function(data) {
//   models.photo.create({ url: data });
// });

// GET PHOTO TAGS & SEED TAGS/PHOTO_TAGS

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
          "maxResults": 20
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

// var download = function(uri, filename, callback) {
//   request.head(uri, function(err, res, body) {
//     if (err) { 
//       return console.error(err);
//     }
//     request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
//   });
// };

// const MIN_LABEL_SCORE = 0.85;

// models.photo.findAll().then(function(photos) {
//   photos.forEach(function(photo) {
//     download(photo.url, 'seeders/photo.jpeg', convertToBase64);

//     function convertToBase64(err, data) {
//       if (err) {
//         return console.error(err);
//       }
//       console.log('convertToBase64');
//       fs.readFile('photo.jpeg', 'base64', sendToGoogleVision);
//     }

//     function sendToGoogleVision(err, data) {
//       if (err) {
//         return console.error(err);
//       }
//       visionRequest.requests[0].image.content = data;
//       var request_options = {
//         url: 'https://vision.googleapis.com/v1/images:annotate',
//         qs: { key: 'AIzaSyANu3XdMMEHlIV0ehYSS_83r9HYwRNicoM' },
//         method: 'POST',
//         json: visionRequest
//       };
//       request(request_options, parseResponse);
//     }

//     function parseResponse(error, response, body) {
//       if (error) {
//         return console.error(error);
//       }
//       var label_info = body.responses[0].labelAnnotations;
//       label_info.forEach(addLabelToDB);
//     }

//     function addLabelToDB(label) {
//       if (label.score >= MIN_LABEL_SCORE) {
//         console.log('label scored');
//         models.tag.create({ name: label.description }).then(function(tag) {
//           console.log('created tag');
//           photo.addTag(tag).then(function() {
//             photo.hasTag(tag).then(console.log);
//             tag.hasPhoto(photo).then(console.log);
//           });
//         }); 
//       }
//     }
//   });
// });

// models.photo.findById(100).then(function(photo) {
//   download(photo.url, 'photo.jpeg', convertToBase64)

//   function convertToBase64() {
//     fs.readFile('photo.jpeg', 'base64', sendToGoogleVision)
//   }

//   function sendToGoogleVision(err, data) {
//     if (err) {
//       return console.error(err);
//     }
//     visionRequest.requests[0].image.content = data;
//     var request_options = {
//       url: 'https://vision.googleapis.com/v1/images:annotate',
//       qs: { key: 'AIzaSyANu3XdMMEHlIV0ehYSS_83r9HYwRNicoM' },
//       method: 'POST',
//       json: visionRequest
//     };
//     request(request_options, parseResponse);
//   }

//   function parseResponse(error, response, body) {
//     if (error) {
//       return console.error(error);
//     }
//     var label_info = body.responses[0].labelAnnotations;
//     label_info.forEach(addLabelToDB)
//   }

//   function addLabelToDB(label) {
//     if (label.score >= MIN_LABEL_SCORE) {
//       console.log('label scored');
//       models.tag.create({ name: label.description }).then(function(tag) {
//         console.log('created tag');
//         photo.addTag(tag).then(function() {
//           photo.hasTag(tag).then(console.log);
//           tag.hasPhoto(photo).then(console.log);
//         });
//       });
//     }
//   }
// });

const NUM_PHOTOS = 600;

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
