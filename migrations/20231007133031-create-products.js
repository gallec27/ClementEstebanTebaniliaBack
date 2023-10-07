'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tb_products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      productCode: {
        type: Sequelize.STRING,
        allowNull: false
      },
      productName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      productDetail: {
        type: Sequelize.STRING
      },
      productPrice: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      productDescription: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      productImage: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      category_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'tb_categories',
          key: 'id'
        }
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('tb_products');
  }
};

