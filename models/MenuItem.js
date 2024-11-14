// models/MenuItem.js
const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../db');

class MenuItem extends Model {}

MenuItem.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  vegetarian: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'MenuItem',
});

module.exports = MenuItem;
