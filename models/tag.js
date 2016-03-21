'use strict';
module.exports = function(sequelize, DataTypes) {
  var Tag = sequelize.define('tag', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // Tag.hasMany(models.PhotoTag);
        Tag.belongsToMany(models.Photo, {through: 'PhotoTag'});  
      }
    }
  });
  return Tag;
};