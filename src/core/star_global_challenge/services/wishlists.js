const _ = require('underscore');
const { ErrorCode, NotFoundError } = require('../../../common/error');
const { Wishlist, WishlistItem, sequelize } = require('../models');

const create = (params) => {
  return Wishlist.create(params, { fields: ['name'] });
};

const addItems = async (wishlistId, wishlistItems) => {
  const wishlist = await Wishlist.findByPk(wishlistId);
  if (!wishlist) throw new NotFoundError(ErrorCode.WISHLIST.NOT_FOUND);

  const t = await sequelize.transaction();
  try {
    insertedWishlistItems = await WishlistItem.bulkCreate(wishlistItems, {
      fields: ['value'],
      returning: true,
      transaction: t,
    });

    await wishlist.addItems(insertedWishlistItems, { transaction: t });

    await t.commit();

    return getWishlistWithDetail(wishlistId);
  } catch (err) {
    await t.rollback();
    throw err;
  }
};

const update = async (wishlistId, params) => {
  const { name } = params;

  const wishlist = await Wishlist.findByPk(wishlistId);
  if (!wishlist) throw new NotFoundError(ErrorCode.WISHLIST.NOT_FOUND);

  wishlist.name = name;
  return wishlist.save();
};

const index = () => {
  return Wishlist.findAll({ attributes: ['id', 'name'] });
};

const getDetails = (wishlistId) => {
  return getWishlistWithDetail(wishlistId).then((wishlistDetail) => {
    if (!wishlistDetail) throw new NotFoundError(ErrorCode.WISHLIST.NOT_FOUND);
    return wishlistDetail;
  });
};

const getWishlistWithDetail = (wishlistId) => {
  return Wishlist.findByPk(wishlistId, {
    attributes: ['id', 'name'],
    include: {
      model: WishlistItem,
      as: 'items',
      attributes: ['id', 'value'],
      through: {
        attributes: ['status'],
      },
    },
  });
};

module.exports = {
  create,
  addItems,
  update,
  index,
  getDetails,
};
