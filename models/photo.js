'use strict';
module.exports = function(sequelize, DataTypes) {
  var Photo = sequelize.define('photo', {
    url: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // Photo.hasMany(models.PhotoTag);
        Photo.belongsToMany(models.tag, {through: 'PhotoTag'});
        Photo.belongsToMany(models.user, {through: 'UserLike'});
        Photo.belongsToMany(models.user, {through: 'UserAdded'});
      }
    }
  });
  return Photo;
};