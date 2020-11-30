const express = require('express');
const router = express.Router();

const wishlistController = require('../controllers/wishlists');

router.post('/v1/wishlists', wishlistController.create);
router.post('/v1/wishlists/:id/items', wishlistController.addItems);

router.put('/v1/wishlists/:id', wishlistController.update);

router.get('/v1/wishlists', wishlistController.index);
router.get('/v1/wishlists/:id/details', wishlistController.getDetails);

module.exports = router;
