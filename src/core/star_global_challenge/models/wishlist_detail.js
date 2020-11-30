'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class WishlistDetail extends Model {
    static associate(models) {
      WishlistDetail.belongsTo(models.WishlistItem);
      WishlistDetail.belongsTo(models.Wishlist);
    }
  };

  WishlistDetail.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'WishlistDetail',
    underscored: true
  });

  return WishlistDetail;
};
