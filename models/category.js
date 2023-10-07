const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize-config');

const Category = sequelize.define('tb_categories', {
  categoryName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true, // Esto habilitará los campos createdAt y updatedAt
}
);

module.exports = Category;
