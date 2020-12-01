const transaction = {
  commit: jest.fn(),
  rollback: jest.fn()
};

const db = {
  Wishlist: {
    create: jest.fn(),
    findByPk: jest.fn(),
    findAll: jest.fn()
  },
  WishlistItem: {
    bulkCreate: jest.fn()
  },
  sequelize: {
    transaction: jest.fn().mockResolvedValue(transaction)
  },
  transaction
};

module.exports = db;
