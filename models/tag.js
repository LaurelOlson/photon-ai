'use strict';
module.exports = function(sequelize, DataTypes) {
  var Tag = sequelize.define('tag', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Tag.belongsToMany(models.photo, { as: { singular: 'photo', plural: 'photos' }, through: 'photo_tags' });  
      }
    }
  });
  return Tag;
};