'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Wishlist extends Model {
    static associate(models) {
      Wishlist.belongsToMany(models.WishlistItem, { through: models.WishlistDetail, as: 'items' });
      Wishlist.hasMany(models.WishlistDetail);
    }
  };

  Wishlist.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Wishlist',
    underscored: true
  });

  return Wishlist;
};
