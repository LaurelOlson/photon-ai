'use strict';

var fs = require('fs');
var request = require('request');
var split = require('split');
var models = require(__dirname + '/../models/index.js');

// SEED PHOTOS

var readStream = fs.createReadStream('seeders/imglinks.csv');
var lineStream = readStream.pipe(split());
lineStream.on('data', function(data) {
  models.photo.create({ url: data });
});