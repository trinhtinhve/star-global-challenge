const logger = require('../../common/logger');
const wishlistService = require('../../core/star_global_challenge/services/wishlists');

const create = (req, res, next) => {
  return wishlistService
    .create(req.body)
    .then((wishlist) => res.json(wishlist))
    .catch((err) => {
      logger.error('Error creating wishlist: ' + err.message);
      next(err);
    });
};

const addItems = (req, res, next) => {
  const { id: wishlistId } = req.params;
  const { items: wishlistItems } = req.body;

  return wishlistService
    .addItems(wishlistId, wishlistItems)
    .then((wishlistDetail) => res.json(wishlistDetail))
    .catch((err) => {
      logger.error('Error creating wishlist items: ' + err.message);
      next(err);
    });
};

const update = (req, res, next) => {
  const { id: wishlistId } = req.params;

  return wishlistService
    .update(wishlistId, req.body)
    .then((wishlist) => res.json(wishlist))
    .catch((err) => {
      logger.error('Error updating wishlist: ' + err.message);
      next(err);
    });
};

const index = (req, res, next) => {
  return wishlistService.index().then((wishlists) => res.json(wishlists));
};

const getDetails = (req, res, next) => {
  const { id: wishlistId } = req.params;

  return wishlistService
    .getDetails(wishlistId)
    .then((wishlistDetail) => res.json(wishlistDetail))
    .catch((err) => {
      logger.error('Error getting wishlist details: ', err);
      next(err);
    });
};

module.exports = {
  create,
  addItems,
  update,
  index,
  getDetails,
};
