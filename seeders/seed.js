var fs = require('fs');
var split = require('split');
var readStream = fs.createReadStream('seeders/imglinks.csv');
var lineStream = readStream.pipe(split());
var models = require(__dirname + '/../models/index.js');

lineStream.on('data', function(data) {
  models.photo.create({ url: data });
});