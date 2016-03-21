'use strict';
module.exports = function(sequelize, DataTypes) {
  var Photo = sequelize.define('photo', {
    url: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // Photo.hasMany(models.PhotoTag);
        Photo.belongsToMany(models.Tag, {through: 'PhotoTag'});
        Photo.belongsToMany(models.User, {through: 'UserLike'});
        Photo.belongsToMany(models.User, {through: 'UserAdded'});
      }
    }
  });
  return Photo;
};