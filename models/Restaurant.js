const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('../db');
class Restaurant extends Model {}

Restaurant.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cuisine: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Restaurant',
  }
);

module.exports = Restaurant;