'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class WishlistItem extends Model {
    static associate(models) {
      WishlistItem.belongsToMany(models.Wishlist, {
        through: models.WishlistDetail,
      });
      WishlistItem.hasMany(models.WishlistDetail);
    }
  }

  WishlistItem.init(
    {
      value: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'WishlistItem',
      underscored: true,
    }
  );

  return WishlistItem;
};
