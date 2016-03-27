'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('user', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    fbook_id: DataTypes.STRING,
    fbook_token: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        User.belongsToMany(models.photo, { as: { singular: 'like', plural: 'likes' }, through: 'liked_photos' });
        User.belongsToMany(models.photo, { as: { singular: 'add', plural: 'adds' }, through: 'added_photos' });
      }
    },
    getterMethods: {
      someValue: function() {
        return this.someValue;
      }
    },
    setterMethods: {
      someValue: function(value) {
        return this.someValue = value;
      }
    }
  });
  return User;
};