const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize-config');

const Category = sequelize.define('tb_categories', {
  categoryName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true, 
}
);

module.exports = Category;
