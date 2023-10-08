const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize-config');
const Category = require('./category');

const Product = sequelize.define('tb_products', {
  productCode: { 
    type: DataTypes.STRING,
    allowNull: false
  },
  productName: { 
    type: DataTypes.STRING,
    allowNull: false
  },
  productDetail: {
    type: DataTypes.STRING,
  },
  productPrice: { 
    type: DataTypes.DOUBLE(8, 2),
    allowNull: false
  },
  productDescription: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  productImage: { 
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  timestamps: true 
});

Product.belongsTo(Category, { foreignKey: 'category_id' });

module.exports = Product;
