const express = require('express');
const router = express.Router();

const indexRouter = require('./routes/index');

router.use('/wishlist-management/api', [
  indexRouter
]);

module.exports = router;
