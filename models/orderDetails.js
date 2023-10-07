const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize-config');
const Order = require('./order'); // Asegúrate de importar el modelo de orden si aún no lo has hecho
const Product = require('./product'); // Asegúrate de importar el modelo de producto si aún no lo has hecho

const OrderDetail = sequelize.define('tb_orderDetails', {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
  },
});

OrderDetail.belongsTo(Order, { foreignKey: 'order_id' });
OrderDetail.belongsTo(Product, { foreignKey: 'product_id' });

module.exports = OrderDetail;
