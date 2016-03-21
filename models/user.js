'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('user', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        User.belongsToMany(models.Photo, {through: 'LikedPhoto'});
        User.belongsToMany(models.Photo, {through: 'AddedPhoto'});
      }
    }
  });
  return User;
};