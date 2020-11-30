const express = require('express');
const router = express.Router();

const wishlistRoutes = require('./routes/wishlists');

router.use('/wishlist-service/api', [
  wishlistRoutes
]);

module.exports = router;
