const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('../db/connection');

// Define the Menu model
class Menu extends Model {}

Menu.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Menu',
  }
);

module.exports = Menu;
