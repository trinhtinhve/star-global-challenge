const prefix = 'wishlist';

const makeMessage = (errorCode, message) => ({
  code: `${prefix}-${errorCode}`,
  message
});

module.exports = {
  WISHLIST: {
    NOT_FOUND: makeMessage('1000', 'Wishlist Not found')
  }
};
