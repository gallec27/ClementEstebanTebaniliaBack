const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize-config');
const User = require('./user'); 

const Order = sequelize.define('tb_orders', {
  total_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  shipping_type: {
    type: DataTypes.ENUM('Retira por el local', 'Enviar a domicilio'),
    allowNull: false,
  },
  shipping_address: {
    type: DataTypes.STRING(255), 
  },
}, {
  timestamps: true, 
});

Order.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Order;
