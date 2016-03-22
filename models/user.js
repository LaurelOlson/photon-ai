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
        User.belongsToMany(models.photo, {through: 'LikedPhoto'});
        User.belongsToMany(models.photo, {through: 'AddedPhoto'});
      }
    }
  });
  return User;
};