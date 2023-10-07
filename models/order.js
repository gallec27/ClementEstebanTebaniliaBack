const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize-config');
const User = require('./user'); // Asegúrate de importar el modelo de usuario si aún no lo has hecho

const Order = sequelize.define('tb_orders', {
  total_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  shipping_type: {
    type: DataTypes.ENUM('retiro por el local', 'envío a domicilio'),
    allowNull: false,
  },
  shipping_address: {
    type: DataTypes.STRING(255), // Cambiado a STRING con longitud 255
  },
});

Order.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Order;
