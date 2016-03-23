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
        User.belongsToMany(models.photo, { as: { singular: 'like', plural: 'likes' }, through: 'liked_photos' });
        User.belongsToMany(models.photo, { as: { singular: 'add', plural: 'adds' }, through: 'added_photos' });
      }
    }
  });
  return User;
};