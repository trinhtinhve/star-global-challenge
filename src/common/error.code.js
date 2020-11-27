const prefix = 'wishlist';

const makeMessage = (errorCode, message) => ({
  code: `${prefix}-${errorCode}`,
  message
});

module.exports = {
  
};
