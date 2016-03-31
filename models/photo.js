'use strict';
module.exports = function(sequelize, DataTypes) {
  var Photo = sequelize.define('photo', {
    url: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    width: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    height: {
      type: DataTypes.FLOAT,
      allowNull: false,
    }
  }, {
    classMethods: {
      associate: function(models) {
        Photo.belongsToMany(models.tag, { as: { singular: 'tag', plural: 'tags' }, through: 'photo_tags' });
        Photo.belongsToMany(models.user, { as: { singular: 'liker', plural: 'likers' }, through: 'liked_photos' });
        Photo.belongsToMany(models.user, { as: { singular: 'adder', plural: 'adders' }, through: 'added_photos' });
      }
    }
  });
  return Photo;
};