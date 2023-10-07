const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize-config');
const Category = require('./category');

const Product = sequelize.define('tb_products', {
  productCode: { // Cambiado de "code" a "productCode"
    type: DataTypes.STRING,
    allowNull: false
  },
  productName: { // Cambiado de "nombre" a "productName"
    type: DataTypes.STRING,
    allowNull: false
  },
  productDetail: { // Cambiado de "detalle" a "productDetail"
    type: DataTypes.STRING,
  },
  productPrice: { // Cambiado de "precio" a "productPrice"
    type: DataTypes.DOUBLE(8, 2),
    allowNull: false
  },
  productDescription: { // Cambiado de "descripcion" a "productDescription"
    type: DataTypes.TEXT,
    allowNull: false
  },
  productImage: { // Cambiado de "imagen" a "productImage"
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  timestamps: true // Esto habilitará los campos createdAt y updatedAt
});

Product.belongsTo(Category, { foreignKey: 'category_id' });

module.exports = Product;
