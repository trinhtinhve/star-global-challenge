'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('wishlist_details', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      wishlist_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'wishlists'
          },
          key: 'id'
        },
        allowNull: false
      },
      wishlist_item_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'wishlist_items'
          },
          key: 'id'
        },
        allowNull: false
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('wishlist_details');
  }
};
